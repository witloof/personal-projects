class MarqueController < ApplicationController

  def models
    marque = Marque.find(params[:id])
    if(marque)
      render json: marque.models, status: 200
    else
      render json: {}, statu: 200
    end
  end
end
