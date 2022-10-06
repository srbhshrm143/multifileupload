require 'securerandom'
require 'csv'
require 'json'
require 'set'
require 'yaml'

source = CSV.read('./data.csv', headers: true, encoding: 'UTF-8')
category_list = File.read('./categories.txt').lines.map(&:strip)
item_images = File.read('./item_images.txt').lines.map(&:strip).map(&:to_s)
profile_images = File.read('./profile_images.txt').lines.map(&:strip).map(&:to_s)

def to_cat(cat)
  JSON
    .parse(cat)
    .first
    .gsub(' >> ', '/')
    .gsub('\'', '')
    .gsub('&', 'n')
    .gsub(' ', '_')
    .gsub(/.\(.*\)/, '')
    .downcase
end

def photo_for(object_uuid, file_path, photo_type: 'photo')
  file_name = File.basename(file_path)
  {
    "photo": {
      "path": file_path,
      "versions": {
        "sm": file_path,
        "sm_avif": file_path,
        "m": file_path,
        "m_avif": file_path,
        "lg": file_path,
        "lg_avif": file_path,
        "xl": file_path,
        "xl_avif": file_path,
        "uncropped": file_path,
        "uncropped_avif": file_path,
      },
      "extension": File.extname(file_name),
      "file_name": file_name
    },
    "photo_type": photo_type,
    "object_uuid": object_uuid
  }
end

def item_detail_for(item, lang)
  {
    "item_id": item['_id'],
    "lang": lang,
    "name": text_translation(item['name'], lang),
    "description": text_translation(item['description'], lang)
  }
end

def text_translation(text, lang)
  return text if lang == 'en'

  "#{lang}#{text}"
end

now = Time.now.utc.to_s

items = []
items_inventories = []
items_details = []
statuses = []
categories = []

start_sequence = 0
id_sequence = -> { (start_sequence += 1).to_s }

# user_id == profile.id
profiles = [
  { uuid: 'ed034dc5-540e-42ab-9453-75ece6abb7f2', user_id: id_sequence.call, slug: 'yan-seller', name: 'Yan Seller', last_name: 'Yan', first_name: 'Seller' },
  { uuid: 'ffec6d59-76ba-40d7-a0a1-b594c038c058', user_id: id_sequence.call, slug: 'anton-admin', name: 'Anton Admin', last_name: 'Anton', first_name: 'Admin', permissions: '{"superadmin": true}' },
  { uuid: '60593c97-165a-4a52-8e91-e26ae77f1cb8', user_id: id_sequence.call, slug: 'frank-buyer', name: 'Frank Buyer', last_name: 'Frank', first_name: 'Buyer' },
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222fbf', user_id: id_sequence.call, slug: 'ann-random', name: 'Ann Random', last_name: 'Ann', first_name: 'Random' },
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222fbc', user_id: id_sequence.call, slug: 'roy-lurker', name: 'Roy Lurker', last_name: 'Roy', first_name: 'Lurker' },

  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222fm1', user_id: id_sequence.call, slug: 'employee-a-1', name: 'emA1', last_name: 'A1-last-name', first_name: 'A-1-first-name' }, # 6
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222fm2', user_id: id_sequence.call, slug: 'employee-b-1', name: 'emB1', last_name: 'B1-last-name', first_name: 'B-1-first-name' },
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222fm3', user_id: id_sequence.call, slug: 'employee-c-1', name: 'emC1', last_name: 'C1-last-name', first_name: 'C-1-first-name' },
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222fm4', user_id: id_sequence.call, slug: 'employee-c-2', name: 'emC2', last_name: 'C2-last-name', first_name: 'C-2-first-name' }, # 9
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222ip1', user_id: id_sequence.call, slug: '', name: '', last_name: 'Smith', first_name: 'Mary' }, # 10
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222nsa', user_id: id_sequence.call, slug: 'new-superadmin', name: 'nsa1', last_name: 'Maddox', first_name: 'Julie' }, # 11
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222cps', user_id: id_sequence.call, slug: 'change-password', name: 'cps1', last_name: 'Stanton', first_name: 'Ben' } # 12
]

organizations = [
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222foa', slug: 'organization-a', name: 'Organization A',
    contact_emails: 'employee-a-1@example.com', offline_stores: ['Blue store', 'Red store'], _id: id_sequence.call,
    promoted: false, shipping_types: %w[personal_pickup delivery], delivery_fee: 300
  }, # 13
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222fob', slug: 'organization-b', name: 'Organization B',
    contact_emails: 'employee-b-1@example.com', offline_stores: ['White store', 'Black store'],
    _id: id_sequence.call, promoted: true, shipping_types: %w[personal_pickup delivery], delivery_fee: 400
  }, # 14
  { uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222foc', slug: 'organization-c', name: 'Organization C',
    contact_emails: 'employee-c-1@example.com', offline_stores: ['Orange store', 'Yellow store'],
    _id: id_sequence.call, promoted: true, shipping_types: %w[personal_pickup delivery], delivery_fee: 450
  }  # 15
]

groups = [
  {
    name:        'main',
    summary:     'Main group for posts, questions',
    content_type: 'question',
    description: 'Main group for posts, questions',
    uuid:        '2c8a51e2-291f-4f0d-94ea-ec010g222fmg',
    group_type: 'custom',
    ask_to_join: 'no',
    meta_visible: 'anonymous',
    content_visible: 'anonymous',
    approve_request: 'anonymous',
    post_content: 'anonymous',
    invite_member: 'anonymous'
  }
]

# user_id == profile.id thus we user_id as
organization_memberships = [
  { _id: id_sequence.call, name: 'organization_membership', uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222ma1', l_id: '6', r_id: '13', l_accepted_at: now, r_accepted_at: now },
  { _id: id_sequence.call, name: 'organization_membership', uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222mb1', l_id: '7', r_id: '14', l_accepted_at: now, r_accepted_at: now },
  { _id: id_sequence.call, name: 'organization_membership', uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222mc1', l_id: '8', r_id: '15', l_accepted_at: now, r_accepted_at: now },
  { _id: id_sequence.call, name: 'organization_membership', uuid: '2c8a51e2-291f-4f0d-94ea-ec010c222mc2', l_id: '9', r_id: '15', l_accepted_at: now, r_accepted_at: now }
]

categories = category_list.map { |c| { key: c, uuid: SecureRandom.uuid } }

tags = [
  'circulareconomy',
  'cx',
  'designthinking',
  'digital',
  'economic',
  'energy',
  'food',
  'environment',
  'innovation',
  'newmembers',
  'renewables',
  'resources',
  'sustainability',
  'technology',
  'wastewater',
  'water'
]

source.take(1000).map.with_index do |row, index|
  uuid = SecureRandom.uuid
  owner = organizations[index % 3][:_id]
  item = {
    _id: id_sequence.call,
    item_inventory_id: id_sequence.call,
    price: row['price'].to_f < 1000 ? 1099 : row['price'].to_i,
    tax_rate: 10,
    category: category_list.sample,
    uuid: uuid,
    currency: 'usd',
    owner: owner,
    promoted: rand(1..10) > 9,
    c__status: 'app.statuses.items.published',
    photo_ids: [],
    main_variant: true,
    quantity: rand(1..5),
    attributes_ids: [],
    attributes_json: '[]',
    return_days: 33
  }
  item[:sku] = "SKU-#{item[:_id]}"
  item[:original_price] = rand(1..50) > 49 ? item[:price] * 1.1 : nil

  item_inventory = {
    _id: item[:item_inventory_id],
    item_ids: [item[:_id]],
    owner: owner,
    item_type: row['item_type'] || 'physical',
    sku: "SKU-#{item[:item_inventory_id]}",
    c__status: 'app.statuses.items.published'
  }
  item_inventory[:max_in_one_order] = rand(3..5)

  statuses << {
    profile_id: owner,
    object_id: item_inventory[:_id],
    fullname: 'app.statuses.items.published',
    scope: 'app.statuses.items',
    name: 'app.statuses.items.published',
    timestamp: now
  }
  item_detail_en_id = id_sequence.call
  item_detail_en = {
    _id: item_detail_en_id,
    item_inventory_id: item_inventory[:_id],
    lang: 'en',
    name: row['name'],
    description: row['description'].force_encoding('utf-8'),
    slug: row['name'].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '') + "-#{item_detail_en_id}"
  }
  item_detail_de_id = id_sequence.call
  item_detail_de = {
    _id: item_detail_de_id,
    item_inventory_id: item_inventory[:_id],
    lang: 'de',
    name: "DE #{row['name']}",
    description: "DE #{row['description']}".force_encoding('utf-8'),
    slug: row['name'].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '') + "-#{item_detail_en_id}"
  }

  item[:item_detail_ids] = [item_detail_en_id, item_detail_de_id]

  if item_inventory[:item_type] == 'affiliate'
    item[:affiliate_redirect_url] = row['URL Redirect 1 - Affliate Link']
    item[:affiliate_redirect_url_terms_and_service] = row['URL Redirect 2 - Terms & Conditions']
  elsif item_inventory[:item_type] == 'digital'
  end

  item[:c__keywords] = [
    item_detail_en[:description],
    item_detail_en[:name],
    item_detail_de[:description],
    item_detail_de[:name],
    item[:category]
  ].join(' ').scan(/[\S\\\-]{1,}/).compact.uniq.join(' ')
  item[:c__keywords] += ' '
  item[:c__keywords] += organizations.find { |x| x[:_id] == owner }[:name]
  item[:c__keywords].downcase!

  items << item
  items_inventories << item_inventory
  items_details << item_detail_en
  items_details << item_detail_de
end

item_attributes = [
  {_id: id_sequence.call, name: 'color', value: 'red' },
  {_id: id_sequence.call, name: 'color', value: 'blue' },
  {_id: id_sequence.call, name: 'color', value: 'yellow' },
  {_id: id_sequence.call, name: 'color', value: 'black' },
  {_id: id_sequence.call, name: 'size', value: 'XS' },
  {_id: id_sequence.call, name: 'size', value: 'S' },
  {_id: id_sequence.call, name: 'size', value: 'M' },
  {_id: id_sequence.call, name: 'size', value: 'L' },
  {_id: id_sequence.call, name: 'size', value: 'XL' },
  {_id: id_sequence.call, name: 'size', value: 'XXL' },
]

output = CSV.generate do |csv|
  csv << %w[id properties model_schema created_at updated_at]

  item_attributes.each do |item|
    csv << [item.delete(:_id), item.to_json, 'item_attribute', now, now]
  end

  profiles.each do |profile|
    # adds profile
    csv << [profile[:user_id], profile.to_json, 'profile', now, now]
    # adds profile photo
    csv << [id_sequence.call, photo_for(profile[:uuid], profile_images.sample, photo_type: 'avatar').to_json, 'photo', now, now]
  end

  organizations.each do |organizaiton|
    csv << [organizaiton.delete(:_id), organizaiton.to_json, 'organization', now, now]

    csv << [id_sequence.call, photo_for(organizaiton[:uuid], 'sample_merchant_logo/pos.jpg', photo_type: 'logo').to_json, 'photo', now, now]
  end

  organization_memberships.each do |item|
    csv << [item.delete(:_id), item.to_json, 'relationship', now, now]

    csv << [id_sequence.call, photo_for(item[:uuid], item_images.sample).to_json, 'photo', now, now]
  end

  items.each do |item|
    item_images_copy = item_images.shuffle
    rand(1..4).downto(1).each do |i|
      p_id = id_sequence.call
      item[:photo_ids] << p_id
      csv << [p_id, photo_for(item[:uuid], item_images_copy.shift).to_json, 'photo', now, now]
    end
    csv << [item.delete(:_id), item.to_json, 'item', now, now]
  end

  items_inventories.each do |item|
    csv << [item.delete(:_id), item.to_json, 'item_inventory', now, now]
  end

  items_details.each do |item|
    csv << [item.delete(:_id), item.to_json, 'item_detail', now, now]
  end

  statuses.each do |item|
    csv << [id_sequence.call, item.to_json, 'status', now, now]
  end

  categories.each do |item|
    csv << [id_sequence.call, item.to_json, 'category', now, now]
  end

  groups.each do |item|
    csv << [id_sequence.call, item.to_json, 'group', now, now]
  end

  tags.each do |tag|
    csv << [id_sequence.call, { name: tag }.to_json, 'tag', now, now]
  end
end

File.open('./models.csv', 'w') do |f|
  f.puts output
end
