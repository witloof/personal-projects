require 'faker'

Marque.create([{nom:"Toyota",models:[]},{nom:"Peugeot",models:[]},
{nom:"Renault",models:[]},{nom:"Yyundai",models:[]},{nom:"Ford",models:[]},{nom:"Dacia",models:[]},{nom:"Chevrolet",models:[]},{nom:"Mitsubishi",models:[]},
{nom:"Jeep",models:[]},{nom:"Opel",models:[]},{nom:"Citroen",models:[]},{nom:"Mercedes",models:[]},{nom:"BMW",models:[]},{nom:"Suzuki",models:[]},
{nom:"Isuzu",models:[]},{nom:"Mini",models:[]},{nom:"Audi",models:[]},{nom:"Seat",models:[]},{nom:"Jaguar",models:[]},{nom:"Great Wall",models:[]},
{nom:"Land Rover",models:[]},{nom:"Mazda",models:[]},{nom:"Kia",models:[]},{nom:"Fiat",models:[]}])

#populate categories table
5.times do 
	category = Category.create({name: Faker::Team.sport, description: Faker::Lorem.sentences})
	if(category.save) 
		p "Created #{category.name}"
	else
		p "Failed not create category "
	end
end

Category.all.each do |category|
  slug_name = category.name.parameterize
  category.update(slug_name: slug_name)
end

Product.all.each do |product|
  slug_title = product.title.parameterize
  product.update(slug_title: slug_title)
end