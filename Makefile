include ./.env
UNAME := $(shell uname -s)

all:
ifeq ($(shell grep POSTGRES_DIR .env > /dev/null; echo $$?), 1)
	@read -p "Enter Postgres folder path: " POSTGRES_DIR; \
	mkdir -p $$POSTGRES_DIR/postgres_vol; \
	echo "\nPOSTGRES_DIR=$$POSTGRES_DIR/postgres_vol" >> ./.env
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
ifeq ($(shell grep POSTGRES_DIR .env > /dev/null; echo $$?), 0)
ifeq ($(UNAME), Darwin)
	sed -i "" "$$(grep -n POSTGRES_DIR .env | cut -f1 -d:)d" ./.env
endif
ifeq ($(UNAME), Linux)
	sed -i "$$(grep -n POSTGRES_DIR .env | cut -f1 -d:)d" ./.env
endif
	@echo POSTGRES_DIR var removed from .env
endif
	docker system prune -a
	docker volume prune
	rm -rf ${POSTGRES_DIR}
	rm -rf ./backend/.env
	rm -rf ./frontend/.env
	rm -rf ./backend/dist
	rm -rf ./backend/node_modules
	rm -rf ./frontend/node_modules

re: clean all

.PHONY: all clean re
