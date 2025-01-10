# Include .env file
-include .env
# Make sure variables are exported
export

apply:
	@echo "Applying schema"

	for schema in $(wildcard schema/*.surql); do \
		echo "Applying schema: $$schema"; \
		surreal import $$schema --namespace surrealdb --database pollwebapp --endpoint ${VITE_DB_HOST} --token ${DB_TOKEN};\
	done