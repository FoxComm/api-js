.DEFAULT_GOAL := build

PRETTIER_IGNORE = "bin|dist|docs|lib|node_modules"
JS_FILES = $(shell find $(pwd) -name "*.js" | grep -v -E $(PRETTIER_IGNORE))
PRETTIER_OPTIONS = --single-quote --trailing-comma es5 --print-width 120

setup: clean
	yarn --pure-lockfile

build:
	yarn build

clean:
	rm -rf ./node_modules
	rm -rf ./lib/*

test:
	yarn lint
	yarn flow

fmt:
	./node_modules/.bin/prettier --write $(PRETTIER_OPTIONS) $(JS_FILES) && yarn fix-lint
.PHONY: setup build clean test fmt
