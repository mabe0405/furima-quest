# テーブル設計

## users テーブル

| Column                | Type   | Options                  |
| --------------------- | ------ | ------------------------ |
| nickname              | string | null: false              |
| email                 | string | null: false, unique: true|
| encrypted_password    | string | null: false              |
| last_name             | string | null: false              |
| first_name            | string | null: false              |
| last_name_kana        | string | null: false              |
| first_name_kana       | string | null: false              |
| birth_date            | date   | null: false              |


### Association

- has_many :items
- has_many :purchases
- has_one :fgem
- has_one :coin
- has_one :status

## items テーブル

| Column             | Type       | Options                        |
| ---------------    | ---------- | ------------------------------ |
| name               | string     | null: false                    |
| description        | text       | null: false                    |
| category_id        | integer    | null: false                    |
| status_id          | integer    | null: false                    |
| shipping_cost_id   | integer    | null: false                    |
| shipping_source_id | integer    | null: false                    |
| delivery_date_id   | integer    | null: false                    |
| price              | integer    | null: false                    |
| user               | references | null: false, foreign_key: true |

### Association

- belongs_to :user
- has_one :purchase
- has_one_attached :image

## purchases テーブル

| Column  | Type       | Options                        |
| ------- | ---------- | ------------------------------ |
| user    | references | null: false, foreign_key: true |
| item    | references | null: false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :item
- has_one :address

## addresses テーブル

| Column        | Type       | Options                        |
| ------------- | ---------- | ------------------------------ |
| postal_code   | string     | null: false                    |
| prefecture_id | integer    | null: false                    |
| city          | string     | null: false                    |
| address       | string     | null: false                    |
| building      | string     |                                |
| phone_number  | string     | null: false                    |
| purchase      | references | null: false, foreign_key: true |


### Association

- belongs_to :purchase

## fgems テーブル

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| fgem   | integer    | null: false                    |
| user   | references | null: false, foreign_key: true |


### Association

- belongs_to :user

## coins テーブル

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| coin   | integer    | null: false                    |
| user   | references | null: false, foreign_key: true |


### Association

- belongs_to :user

## abilities テーブル

| Column        | Type       | Options                        |
| ------------- | ---------- | ------------------------------ |
| hp            | integer    | null: false                    |
| mp            | integer    | null: false                    |
| attack        | integer    | null: false                    |
| defense       | integer    | null: false                    |
| speed         | integer    | null: false                    |
| user          | references | null: false, foreign_key: true |


### Association

- belongs_to :user
- belongs_to :weapon
- belongs_to :shield

## weapons テーブル (ActiveHash)

| Column | Type       | Options     |
| ------ | ---------- | ----------- |
| name   | integer    | null: false |
| attack | integer    | null: false |
| price  | integer    | null: false |


### Association

- has_many :abilities

## shields テーブル (ActiveHash)

| Column  | Type       | Options     |
| ------  | ---------- | ----------- |
| name    | integer    | null: false |
| defense | integer    | null: false |
| price   | integer    | null: false |


### Association

- has_many :abilities