# apply schema
apply:
	@echo "Applying schema"

	for schema in $(wildcard schema/*.surql); do \
		echo "Applying schema: $$schema"; \
		surreal import $$schema -u root -p root --namespace surrealdb --database pollwebapp; \
	done