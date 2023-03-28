
const txtWidthElement = document.getElementById("txt_Width");

function CalculateCost() {
    var country_code;
    if (document.querySelector('input[name="radioButton"]:checked') && document.querySelector('input[name="radioButton2"]:checked')) {
        const from = document.querySelector('input[name="radioButton"]:checked');
        if (from.value == "germany") {
            country_code = 1;
        }
        else if (from.value == "othereurope") {
            country_code = 2;
        }
        else if (from.value == "usa") {
            country_code = 3;
        }
        else if (from.value == "china") {
            country_code = 4;
        }
        var price = parseInt(document.getElementById("txt-Price").value, 10);//for 1000 pcs
        var pcs_weight = parseInt(document.getElementById("txt-weight").value, 10); //1 pcs weight in unit of gram
        var box_width = 5;
        var box_length = 5;
        var box_height = 5;


        
        const default_or_custom = document.querySelector('input[name="radioButton2"]:checked');
    
        if (default_or_custom.value == "default") {
            box_width = 30;
            box_length = 30;
            box_height = 30;
        }
        else if (default_or_custom.value == "custom") {
            box_width = parseInt(document.getElementById("txt_Width").value, 10);
            box_length = parseInt(document.getElementById("txt_Length").value, 10);
            box_height = parseInt(document.getElementById("txt_height").value, 10);
        }
        else {
            box_width = 0;
            box_length = 0;
            box_height = 0;
        }

        var box_amount = parseInt(document.getElementById("txt_Box_Amount").value, 10);
        var amount_ina_year = parseInt(document.getElementById("txt_Amount_Year").value, 10);
        var frequency = parseInt(document.getElementById("txt_frequency").value, 10);

        // in this block we decide that which weight are we gonna use
        var total_box_weight = (pcs_weight * box_amount)/1000; //50 gram is initial box weight , total box weight is unit of kg
        var volumetric_weight = (box_width * box_height * box_length) / 5000 //we calculated the volumetric weight 
        var weight_of_one_box;
        if (total_box_weight > volumetric_weight) {
            weight_of_one_box = total_box_weight; //gram to klogram

        }
        else if (total_box_weight <= volumetric_weight) {
            weight_of_one_box = volumetric_weight;
        }
        



        var cost_per_box;


        price_country_code_matrix = [
            ["kg", 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0],
            [1, 34.4, 34.4, 39.46, 47.91, 52.21, 61.33, 70.45, 75.12, 83.74, 92.35, 95.21, 100.75, 106.33, 111.9, 113.91, 119.32, 124.7, 126.04, 131.27, 136.51, 143.05, 149.57, 156.12, 162.66, 169.21, 170.06, 176.39, 182.72, 189.06, 195.37, 201.7, 208.03, 214.37, 220.68, 227.01, 233.34, 239.68, 245.99, 252.32, 258.65],
            [2, 41.15, 41.15, 52.94, 64.77, 68.93, 79.54, 90.18, 95.22, 105.24, 115.29, 120.26, 128.59, 136.95, 145.31, 149.02, 157.1, 165.21, 167.9, 175.73, 183.58, 192.74, 201.88, 211.04, 220.2, 229.34, 230.81, 239.68, 248.52, 257.39, 266.25, 271.3, 276.36, 281.43, 286.5, 291.56, 296.61, 301.67, 306.74, 311.81, 316.87],
            [3, 49.37, 55.87, 55.87, 62.36, 61.33, 70.45, 79.54, 83.74, 92.35, 100.96, 106.33, 114.69, 123.05, 131.38, 135.51, 143.61, 151.69, 154.81, 162.66, 170.52, 179.65, 188.82, 197.95, 207.12, 216.28, 218.14, 227.01, 235.88, 244.72, 253.59, 266.25, 278.9, 291.56, 304.21, 316.87, 329.52, 342.18, 354.83, 367.49, 380.14],
            [4, 46.22, 46.22, 58.01, 69.83, 73.49, 84.1, 94.74, 99.53, 109.55, 119.6, 124.44, 132.77, 141.13, 149.49, 153.05, 161.15, 169.26, 171.8, 179.65, 187.51, 197.95, 208.42, 218.9, 229.34, 239.81, 242.19, 252.32, 262.45, 272.56, 282.7, 292.81, 302.94, 313.07, 323.18, 333.32, 343.43, 353.56, 363.69, 373.8, 383.94],
            [5, 47.91, 47.91, 59.7, 71.52, 75.01, 85.62, 96.26, 100.96, 110.98, 121.03, 127.2, 136.95, 146.71, 156.44, 161.15, 170.61, 180.04, 183.58, 192.74, 201.88, 212.35, 222.82, 233.27, 243.74, 254.19, 256.12, 266.25, 276.36, 286.5, 296.61, 306.74, 316.87, 326.98, 337.12, 347.23, 357.36, 367.49, 377.6, 387.74, 397.85],
            [6, 47.91, 47.91, 59.7, 71.52, 75.01, 85.62, 96.26, 100.96, 110.98, 121.03, 127.2, 136.95, 146.71, 156.44, 161.15, 170.61, 180.04, 183.58, 192.74, 201.88, 212.35, 222.82, 233.27, 243.74, 254.19, 256.12, 266.25, 276.36, 286.5, 296.61, 306.74, 316.87, 326.98, 337.12, 347.23, 357.36, 367.49, 377.6, 387.74, 397.85],
            [7, 47.91, 47.91, 59.7, 71.52, 75.01, 85.62, 96.26, 100.96, 110.98, 121.03, 127.2, 136.95, 146.71, 156.44, 161.15, 170.61, 180.04, 183.58, 192.74, 201.88, 212.35, 222.82, 233.27, 243.74, 254.19, 256.12, 266.25, 276.36, 286.5, 296.61, 306.74, 316.87, 326.98, 337.12, 347.23, 357.36, 367.49, 377.6, 387.74, 397.85],
            [8, 54.63, 54.63, 71.52, 88.38, 94.74, 109.91, 125.11, 132.49, 146.85, 161.18, 167.58, 178.73, 189.85, 201, 205.69, 216.5, 227.31, 230.65, 241.12, 251.57, 260.73, 269.89, 279.03, 288.19, 297.36, 296.61, 305.47, 314.34, 323.18, 332.05, 344.69, 357.36, 370, 382.67, 395.31, 407.98, 420.62, 433.29, 445.93, 458.6]

        ];



        // other europe 2
        // Germany 1
        // usa 3
        //china 5

        for (let i = 0; i < 8; i++) {

            if (price_country_code_matrix[i][0] == country_code) {
                for (let j = 1; j <= 40; j++) {
                    if (weight_of_one_box <= price_country_code_matrix[0][j] ) {
                        cost_per_box = price_country_code_matrix[i][j];
                        break;
                    }
                    else if (weight_of_one_box>30) {
                        alert("weight of 1 box can be 30kg maximum. Please rearange the product amount in one box");
                        break;
                    }
                }
            }

        }
        const amount_of_boxes_in_a_year = amount_ina_year / box_amount; //bir yıldaki toplam gecelek kutu sayısı
        const amount_of_boxes_for_one_shipment = amount_of_boxes_in_a_year / frequency; //tek bir sevkiyatta gelecek olan kutu sayısı
        const product_cost_for_one_shipment = amount_of_boxes_for_one_shipment * box_amount / 1000 * price; //tek bir sevkiyattaki ürünlere ödenen tutar
        const shipment_cost_for_one_shipment = cost_per_box * amount_of_boxes_for_one_shipment; //tek bir sevkiyattaki sevkiyat maliyeti
        const total_cost_for_one_shipment = shipment_cost_for_one_shipment + product_cost_for_one_shipment; //bir sekiyatın bize toplam maliyeti
        const total_cost_for_one_year = total_cost_for_one_shipment * frequency; //bir yıl boyunca o ürünün tamamını getirmenin bize maliyeti


        //txtWidthElement.value = product_cost_for_one_shipment; //firs row, second column
        document.getElementById("satici_maliyet").value = product_cost_for_one_shipment;
        document.getElementById("shipment_cost").value = shipment_cost_for_one_shipment;
        document.getElementById("taxes").value = weight_of_one_box; //default 0 for now
        document.getElementById("total_cost_per_shipment").value = total_cost_for_one_shipment;
        document.getElementById("total_cost_per_year").value = total_cost_for_one_year;


    }
    else {
        alert("Please Select The Country Code and Box sizes")
    }
    
}
window.onload = function () {
    document.getElementById("satici_maliyet").disabled = true;
    document.getElementById("shipment_cost").disabled = true;
    document.getElementById("taxes").disabled = true;
    document.getElementById("total_cost_per_shipment").disabled = true;
    document.getElementById("total_cost_per_year").disabled = true;
    document.getElementById("txt-Receiver").disabled = true;
    document.getElementById("txt-Receiver").value = "Turkey";
};