.DEFAULT_GOAL := build

setup: clean
	yarn --pure-lockfile

build:
	yarn build

clean:
	rm -rf ./node_modules && rm -rf ./lib/*

test: build
	yarn flow

.PHONY: setup build clean test
