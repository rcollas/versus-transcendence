DIR_CHECK := $(shell grep POSTGRES_DIR .env > /dev/null; echo $$?)
include .env

all: 
ifeq ($(DIR_CHECK), 1)
	@read -p "Enter Postgres folder path: " POSTGRES_DIR; \
	sudo mkdir -p $$POSTGRES_DIR/postgres_vol; \
	echo "POSTGRES_DIR=$$POSTGRES_DIR/postgres_vol" >> .env
endif
ifneq ($(shell cat ./frontend/.env > /dev/null 2>&1; echo $$?), 0)
	echo VITE_PORT=${FRONTEND_PORT} >> ./frontend/.env
	echo VITE_SERVER_PORT=${SERVER_PORT} >> ./frontend/.env
endif
ifneq ($(shell cat ./backend/.env > /dev/null 2>&1; echo $$?), 0)
	echo DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}?schema=public" >> ./backend/.env
	echo PORT=${SERVER_PORT} >> ./backend/.env
endif
	docker compose up --build -V

clean: 
ifeq ($(DIR_CHECK), 0)
	@sed "$(grep -n POSTGRES_DIR .env | cut -f1 -d:)d" .env
	@echo POSTGRES_DIR var removed from .env
endif
	docker system prune -a 
	sudo rm -rf ${POSTGRES_DIR}
	sudo rm -rf ./backend/.env
	sudo rm -rf ./frontend/.env

re: clean all

.PHONY: all clean re