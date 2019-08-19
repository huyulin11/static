var um = window.um || {}; // user manage namespace
um.userid = um.userid || window.userid ;
um.urls = um.urls || {
	
	customerManage 	 	: "/customer/manage/index.shtml" ,
	showUserList 	 	: "/customer/manage/showUserList.shtml" ,
	customerPanel		: "/customer/manage/customerPanel.shtml" ,
	
	// PersonalInfoController
	personalInfo 		: "/customer/personalInfo/view.shtml" ,
	updatePersonInfo 	: "/customer/personalInfo/updatePersonInfo.shtml" ,
	
	// customerMobile
	customerMobile		: "/customer/mobile/view.shtml" ,
	addNewMobile		: "/customer/mobile/addNewMobile.shtml" ,
	delMobile			: "/customer/mobile/delMobile.shtml" ,
	changeDefaultMobile	: "/customer/mobile/changeDefaultMobile.shtml" ,
	showPhoneList		: "/customer/mobile/showPhoneList.shtml" ,
	mobileNoCheck		: "/customer/mobile/mobileNoCheck.shtml" ,

	mobileApprove		: "/customer/mobileApprove/page.shtml",
	
	// customerTelephone	
	customerTelephone 	: "/customer/telephone/view.shtml" ,
	showTelList 		: "/customer/telephone/showTelList.shtml" ,
	addNewTel 			: "/customer/telephone/addNewTel.shtml" ,
	changeDefaultTel 	: "/customer/telephone/changeDefaultTel.shtml" ,
	delTel 				: "/customer/telephone/delTel.shtml" ,
	telNoCheck 			: "/customer/telephone/telNoCheck.shtml" ,

	// customerMailController
	customerMail 		: "/customer/mail/view.shtml" ,
	addNewMail 			: "/customer/mail/addNewMail.shtml" ,
	changeDefaultMail 	: "/customer/mail/changeDefaultMail.shtml" ,
	showUserMailList 	: "/customer/mail/showUserMailList.shtml" ,
	userMailCheck 		: "/customer/mail/userMailCheck.shtml" ,
	delMail 			: "/customer/mail/delMail.shtml" ,

	mailApprove			: "/customer/mailApprove/page.shtml"

}