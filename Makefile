.DEFAULT_GOAL := build

setup: clean
	yarn --pure-lockfile

build: check
	yarn build

clean:
	rm -rf ./node_modules
	rm -rf ./lib/*

check:
	yarn flow

.PHONY: setup build clean check
