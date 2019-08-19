
var htmlString="";

htmlString+="<div class='long-logo'>";
htmlString+="<ul class='ui-list-icons ui-four-icons fn-clear cashier-bank'id='J-chooseBankList' >";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-1' value='ICBC_D' /><label class='icon-box1' for='J-b2c_ebank-icbc105-1' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-2' value='ABC_D' /><label class='icon-box2' for='J-b2c_ebank-icbc105-2' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-3' value='BOC_D' /><label class='icon-box3' for='J-b2c_ebank-icbc105-3' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-4' value='CCB_D' /><label class='icon-box4' for='J-b2c_ebank-icbc105-4' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-5' value='POSTGC_D' /><label class='icon-box5' for='J-b2c_ebank-icbc105-5' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-6' value='COMM_D' /><label class='icon-box6' for='J-b2c_ebank-icbc105-6' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-7' value='CMB_D' /><label class='icon-box7' for='J-b2c_ebank-icbc105-7' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-8' value='SPDB_D' /><label class='icon-box8' for='J-b2c_ebank-icbc105-8' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-9' value='CIB_D' /><label class='icon-box9' for='J-b2c_ebank-icbc105-9' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-10' value='GDB_D' /><label class='icon-box10' for='J-b2c_ebank-icbc105-10' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-11' value='SDB_D' /><label class='icon-box11' for='J-b2c_ebank-icbc105-11' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-12' value='CMBC_D' /><label class='icon-box12' for='J-b2c_ebank-icbc105-12' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-13' value='CITIC_D' /><label class='icon-box13' for='J-b2c_ebank-icbc105-13' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-14' value='CEB_D' /><label class='icon-box14' for='J-b2c_ebank-icbc105-14' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-15' value='PAB_D' /><label class='icon-box15' for='J-b2c_ebank-icbc105-15' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-16' value='BEA_D' /><label class='icon-box16' for='J-b2c_ebank-icbc105-16' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-17' value='SRCB_D' /><label class='icon-box17' for='J-b2c_ebank-icbc105-17' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-18' value='BOB_D' /><label class='icon-box18' for='J-b2c_ebank-icbc105-18' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-19' value='NJCB_D' /><label class='icon-box19' for='J-b2c_ebank-icbc105-19' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-20' value='NBCB_D' /><label class='icon-box20' for='J-b2c_ebank-icbc105-20' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='J-b2c_ebank-icbc105-21' value='0' /><label class='icon-box21' for='J-b2c_ebank-icbc105-21' ></label></<li>";
htmlString+="</ul>";
htmlString+="</div>";

$("#con_tabs_3").html(htmlString);

function checkValue(value){
	$("#bank_type_value").val(value.value);
}
