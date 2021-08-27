class Marque < ApplicationRecord
    default_scope { order(nom: :asc) }
end
