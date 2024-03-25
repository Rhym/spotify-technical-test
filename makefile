CURRENT_DIR = ${CURDIR}

default: help

# --------------------------------------------------------------------------------------------------
# Global
# --------------------------------------------------------------------------------------------------

dev: ## Run the project in dev mode
	cd $(CURRENT_DIR); pnpm dev;

build: ## Run a production build
	cd $(CURRENT_DIR); pnpm build;

update: ## Update npm packages
	cd $(CURRENT_DIR); pnpm update-dependencies;

update.yolo: update ## Update npm packages and remove lock files
	cd $(CURRENT_DIR); rm -fdr pnpm-lock.lock && rm -fdr node_modules && pnpm install && make pre-commit;

lint: ## Run [ESLint](https://eslint.org/)
	cd $(CURRENT_DIR); pnpm lint;

format: ## Run [Prettier](https://prettier.io/)
	cd $(CURRENT_DIR); pnpm format;

pre-commit: format lint build ## Run all commands before a commit

# --------------------------------------------------------------------------------------------------
# Misc
# --------------------------------------------------------------------------------------------------

help: ## Display a list of commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
