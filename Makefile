SHELL = sh
PROJECT_ROOT := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))

# GIT_COMMIT := $(shell git rev-parse HEAD)
# GIT_DIRTY := $(if $(shell git status --porcelain),+CHANGES)

# GO_LDFLAGS ?= -X=github.com/seashell/aqueduct/version.GitCommit=$(GIT_COMMIT)$(GIT_DIRTY)

GO_LDFLAGS = ""

CGO_ENABLED ?= 0

# User defined flags
OS := $(or $(OS),$(O)) # (coming soon) Define build target OS, e.g linux
ARCH := $(or $(ARCH),$(A)) # (coming soon) Define build target architecture, e.g amd64 

# targets 
ALL_TARGETS += linux_amd64 \

default: help

build/linux_amd64/aqueduct: CMD='CGO_ENABLED=$(CGO_ENABLED) GOOS=linux GOARCH=amd64 \
								go build \
								-trimpath \
								-ldflags $(GO_LDFLAGS) \
								-o "$@" '							
build/linux_amd64/aqueduct: $(SOURCE_FILES) ## Build aqueduct for linux/amd64
	@eval ${CMD}

build/linux_arm64/aqueduct: CMD='CGO_ENABLED=$(CGO_ENABLED) GOOS=linux GOARCH=arm64 \
								go build \
								-trimpath \
								-ldflags $(GO_LDFLAGS) \
								-o "$@" '							
build/linux_arm64/aqueduct: $(SOURCE_FILES) ## Build aqueduct for linux/amd64
	@eval ${CMD}


.PHONY: dev
dev: GOOS=$(shell go env GOOS)
dev: GOARCH=$(shell go env GOARCH)
dev: DEV_TARGET=build/$(GOOS)_$(GOARCH)/aqueduct
dev: ## Build for the current development platform
	@echo "==> Removing old development binary..."
	@rm -rf $(PROJECT_ROOT)/build
	@$(MAKE) ui
	@$(MAKE) --no-print-directory $(DEV_TARGET)

.PHONY: ui
ui: ## Generate UI .go bundle
	@echo "==> Generating UI bundle..."
	@go generate

.PHONY: clean
clean: ## Remove build artifacts
	@echo "==> Cleaning build artifacts..."
	@rm -rf "$(PROJECT_ROOT)/build/"

HELP_FORMAT="    \033[36m%-25s\033[0m %s\n"
EG_FORMAT="    \033[36m%s\033[0m %s\n"
.PHONY: help
help: ## Display this usage information
	@echo "Valid targets:"
	@grep -E '^[^ ]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		sort | \
		awk 'BEGIN {FS = ":.*?## "}; \
			{printf $(HELP_FORMAT), $$1, $$2}'
	@echo ""
	@echo "This host will build the following targets if 'make release' is invoked:"
	@echo $(ALL_TARGETS) | sed 's/^/    /'
	@echo ""
	@echo "Valid flags:"
	@grep -E '^[^ ]+ :=.*?## .*$$' $(MAKEFILE_LIST) | \
		sort | \
		awk 'BEGIN {FS = " :=.*?## "}; \
			{printf $(HELP_FORMAT), $$1, $$2}'
	@echo ""
	@echo "Examples:"
	@printf $(EG_FORMAT) "~${PWD}" "$$ make clean"
