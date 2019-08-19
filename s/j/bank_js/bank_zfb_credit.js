
var htmlString="";

htmlString+="<div class='long-logo'>";
htmlString+="<ul class='ui-list-icons ui-four-icons fn-clear cashier-bank'id='C-chooseBankList' >";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-1' value='ICBCB2C' /><label class='icon-box1' for='C-b2c_ebank-icbc105_zfb-1' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-3' value='BOCB2C' /><label class='icon-box3' for='C-b2c_ebank-icbc105_zfb-3' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-4' value='CCB' /><label class='icon-box4' for='C-b2c_ebank-icbc105_zfb-4' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-7' value='CMB' /><label class='icon-box7' for='C-b2c_ebank-icbc105_zfb-7' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-8' value='SPDB' /><label class='icon-box8' for='C-b2c_ebank-icbc105_zfb-8' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-9' value='CIB' /><label class='icon-box9' for='C-b2c_ebank-icbc105_zfb-9' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-10' value='GDB' /><label class='icon-box10' for='C-b2c_ebank-icbc105_zfb-10' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-2' value='ABC' /><label class='icon-box2' for='C-b2c_ebank-icbc105_zfb-2' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-024' value='FDB' /><label class='icon-box024' for='C-b2c_ebank-icbc105_zfb-024' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-13' value='CITIC' /><label class='icon-box13' for='C-b2c_ebank-icbc105_zfb-13' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-021' value='HZCBB2C' /><label class='icon-box021' for='C-b2c_ebank-icbc105_zfb-021' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-022' value='SHBANK' /><label class='icon-box022' for='C-b2c_ebank-icbc105_zfb-022' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-20' value='NBBANK' /><label class='icon-box20' for='C-b2c_ebank-icbc105_zfb-20' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-15' value='SPABANK' /><label class='icon-box15' for='C-b2c_ebank-icbc105_zfb-15' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105_zfb-5' value='POSTGC' /><label class='icon-box5' for='C-b2c_ebank-icbc105_zfb-5' ></label></<li>";
htmlString+="</ul>";
htmlString+="</div>";
$("#con_tabs_2").html(htmlString);

function checkValue(value){
	$("#bank_type_value").val(value.value);
}
