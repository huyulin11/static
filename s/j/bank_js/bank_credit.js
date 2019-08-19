
var htmlString="";

htmlString+="<div class='long-logo'>";
htmlString+="<ul class='ui-list-icons ui-four-icons fn-clear cashier-bank'id='C-chooseBankList' >";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-1' value='ICBC_C' /><label class='icon-box1' for='C-b2c_ebank-icbc105-1' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-3' value='BOC_C' /><label class='icon-box3' for='C-b2c_ebank-icbc105-3' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-4' value='CCB_C' /><label class='icon-box4' for='C-b2c_ebank-icbc105-4' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-6' value='COMM_C' /><label class='icon-box6' for='C-b2c_ebank-icbc105-6' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-7' value='CMB_C' /><label class='icon-box7' for='C-b2c_ebank-icbc105-7' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-8' value='SPDB_C' /><label class='icon-box8' for='C-b2c_ebank-icbc105-8' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-9' value='CIB_C' /><label class='icon-box9' for='C-b2c_ebank-icbc105-9' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-10' value='GDB_C' /><label class='icon-box10' for='C-b2c_ebank-icbc105-10' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-12' value='CMBC_C' /><label class='icon-box12' for='C-b2c_ebank-icbc105-12' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-14' value='CEB_C' /><label class='icon-box14' for='C-b2c_ebank-icbc105-14' ></label></<li>";
htmlString+="<li><input type='radio' onClick='checkValue(this)' name='bank_type' id='C-b2c_ebank-icbc105-16' value='BEA_C' /><label class='icon-box16' for='C-b2c_ebank-icbc105-16' ></label></<li>";
htmlString+="</ul>";
htmlString+="</div>";

$("#con_tabs_4").html(htmlString);

function checkValue(value){
	$("#bank_type_value").val(value.value);
}
