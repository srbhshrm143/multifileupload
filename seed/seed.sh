set -eu

DEFAULT_ENV=""
POS_ENV="${1:-$DEFAULT_ENV}"

pos-cli data clean $POS_ENV --auto-confirm --include-schema
cp ./seed/categories-i18n.en.txt ./app/translations/en/en_categories.yml
cp ./seed/categories-i18n.de.txt ./app/translations/de/de_categories.yml

cp ./seed/item_attributes.en.yml ./app/translations/en/item_attributes.yml
cp ./seed/item_attributes.de.yml ./app/translations/de/item_attributes.yml

pos-cli deploy $POS_ENV
pos-cli data import $POS_ENV --path=./seed/data.zip --zip
pos-cli uploads push $POS_ENV --path=seed/images.zip

rm ./app/translations/en/en_categories.yml
rm ./app/translations/de/de_categories.yml
rm ./app/translations/en/item_attributes.yml
rm ./app/translations/de/item_attributes.yml
