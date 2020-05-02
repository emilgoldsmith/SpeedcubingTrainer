#!/bin/bash

## SHELL BOILERPLATE STARTS HERE. DONT TOUCH ANYTHING INCLUDING THESE COMMENTS, ONLY EDIT THROUGH NODE SCRIPT

## You can update all the files by running 'node scripts/update-shell-script-boilerplate.js'.
## This will also update the filepaths in case you move any files to different directories

# region boilerplate

set -e

ROOT_DIRECTORY=$(dirname "${BASH_SOURCE[0]}")/../..
cd $ROOT_DIRECTORY

# We want relative paths for docker commands specifically and since we use cd relative paths work
DIRECTORY=scripts/pre-configured-commands
ROOT_DIRECTORY=.


run_command_in_docker_with_write_access () {
    docker run --rm --mount "type=bind,source=$(pwd),target=/app,consistency=consistent" publisher-base "$@"
}

run_command_in_docker_with_colors_ctrl_c_capabilitiies_and_updating_file_system () {
    docker run --rm -it --mount "type=bind,source=$(pwd),target=/app,consistency=consistent" publisher-base "$@"
}

run_command_in_docker_with_colors () {
    docker run --rm -t publisher-base "$@"
}

run_command_in_docker_with_colors_and_write () {
    docker run --rm -t --mount "type=bind,source=$(pwd),target=/app,consistency=consistent" publisher-base "$@"
}

run_command_in_docker () {
    docker run --rm publisher-base "$@"
}

run_local_dev_docker_compose_command () {
    COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f config/docker/local-dev-compose.yml "$@"
}

run_production_docker_compose_command () {
    COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f config/docker/production-compose.yml "$@"
}

build_docker_image () {
    DOCKER_BUILDKIT=1 docker build -t publisher-base -f config/docker/Dockerfile --target local-dev ./
}
# endregion

## SHELL BOILERPLATE STOPS HERE. FEEL FREE TO EDIT ANYTHING BELOW THIS COMMENT

./node_modules/.bin/jest --config ./config/testing/jest.acceptance-tests.config.js "$@"
