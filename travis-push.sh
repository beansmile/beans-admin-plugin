#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_build_changed() {
  git checkout fix-travis-ci
  git add dist/*
  git commit -m "Travis build: $TRAVIS_BUILD_NUMBER" -m "[skip ci]"
}

push_commit() {
  git remote rm origin
  git remote add origin https://xifengzhu:${GH_TOKEN}@github.com/beansmile/beans-admin-plugin.git > /dev/null 2>&1
  git push origin fix-travis-ci --quiet
}

setup_git
commit_build_changed
push_commit
