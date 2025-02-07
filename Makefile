# Include .env file
-include .env
# Make sure variables are exported
export

apply-schema-cloud:
	@echo "Applying schema"
	$(eval MODIFIED_DB_HOST := $(subst ws://,http://,${VITE_DB_HOST}))
	for schema in $(wildcard schema/*.surql); do \
		echo "Applying schema: $$schema"; \
		surreal import $$schema --namespace surrealdb --database pollwebapp --endpoint ${MODIFIED_DB_HOST} --token ${DB_TOKEN};\
	done

apply-schema-local:
	@echo "Applying schema"
	$(eval MODIFIED_DB_HOST := $(subst ws://,http://,${VITE_DB_HOST}))
	for schema in $(wildcard schema/*.surql); do \
		echo "Applying schema: $$schema"; \
		surreal import $$schema --namespace surrealdb --database pollwebapp --endpoint http://127.0.0.1:8000 -u root -p root;\
	done