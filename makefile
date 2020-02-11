VERSION := $(shell gogitver)

# harbor values
HARBOR_PROJECT := web
# exported values for use in docker-compose.yml
export ASSEMBLY_VERSION = $(VERSION)
export IMAGE_VERSION_SPECIFIC = $(VERSION)
export DOCKER_REPOSITORY = harbor.syncromatics.com/$(HARBOR_PROJECT)
# values used for chart creation/shipping
CHART_NAME := kafmesh-ui
CHART_LOCATION := ./chart/$(CHART_NAME)
CHART_LINT_ARGS := --set kafmesh_ui.domain_name=tst-kafmesh-ui.syn.am
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
	sed "s/{{version}}/$(VERSION)/g" $(CHART_LOCATION)/Chart.yaml.template > $(CHART_LOCATION)/Chart.yaml
	helm lint $(CHART_LOCATION) $(CHART_LINT_ARGS)
	helm package $(CHART_LOCATION) -d artifacts
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
ship-chart:
	helm push artifacts/$(CHART_NAME)-$(VERSION).tgz $(HARBOR_PROJECT)
version:
	echo "##teamcity[buildNumber '$(VERSION)']"
