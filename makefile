VERSION := $(shell gogitver)

# exported values for use in docker-compose.yml
export ASSEMBLY_VERSION = $(VERSION)
export IMAGE_VERSION_SPECIFIC = $(VERSION)
export DOCKER_REPOSITORY = syncromatics/

.PHONY: build

build: version clean
	docker-compose \
		-f docker-compose.yml \
		pull \
		--ignore-pull-failures
	docker-compose \
		-f docker-compose.yml \
		build \
		--pull
	mkdir -p artifacts

run:
	docker-compose \
		-f docker-compose.yml \
		up \
		--exit-code-from server --abort-on-container-exit \
		client server

clean:
	docker-compose \
		-f docker-compose.yml \
		down

ship: ship-image ship-chart

ship-image:
	docker-compose -f docker-compose.yml push

version:
	echo "##teamcity[buildNumber '$(VERSION)']"
