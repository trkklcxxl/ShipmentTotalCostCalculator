using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace ShipmentTotalCostCalculator.Models
{
    public class Shipment
    {
        string sender, receiver;
        int price, height, width, length, amount_ina_box, amount_ina_year, frequency;
        public Shipment(string sender_,string receiver_,int price_,int height_,int width_,int lenght_,int amount_ina_box_,int amount_ina_year_,int frequency_ ) 
        { 
            sender = sender_;
            receiver = receiver_;       
            price = price_; 
            height = height_;           
            width = width_;
            length = lenght_;
            amount_ina_box = amount_ina_box_;   
            amount_ina_year = amount_ina_year_; 
            frequency = frequency_;

        } 
        
        public void Calc_Cost()
        {
            
        }
    }
}
