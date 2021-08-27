class ContactController < ApplicationController
  def index
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)

    respond_to do |format|
      if @contact.save
        format.html { redirect_to contact_path, notice: 'Votre message a été bien reçu. Merci de votre retour.' }
        format.json { render :index, status: :created, location: @contact }
      else
        format.html { render :new }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end

  end

 private
  def contact_params
    params.require(:contact).permit(:nom, :email, :message)
  end
end
