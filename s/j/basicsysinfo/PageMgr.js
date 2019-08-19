	function PageMgr(){
		this.totalDataCount = document.getElementById('dataCount').innerHTML/1;
		this.countPerPage = $('div#view p :text').val().match(/\d+/)[0] / 1;
		this.currentPage = 0 ;
		this.setCountPerPage = function(count){
			this.countPerPage =  count ;
			$('div#view p :text').val(count) ;
		}
		this.setTotalDataCount = function(value){
			this.totalDataCount = value ;
			document.getElementById('dataCount').innerHTML = value ;
			var endPage = getEndPage(this.totalDataCount,this.countPerPage);
			if (this.currentPage > endPage){// 处理因删除数据造成页数减少的可能情况
				this.currentPage = endPage ;
			}
			setPageChoose(this);
		}
		this.atEndPage = function(){
			var endPage = getEndPage(this.totalDataCount,this.countPerPage);
			return (this.currentPage == endPage) ;
		}
		this.addTotalDataCount = function(){
			this.setTotalDataCount(this.totalDataCount + 1);
		}
		this.decTotalDataCount = function(){
			this.setTotalDataCount(this.totalDataCount - 1);
		}
		this.goFirst = function(){
			this.currentPage = 0 ;
			setPageChoose(this);
			return scObject(this.countPerPage,this.currentPage);
		}
		this.goEnd = function(){
			this.currentPage = getEndPage(this.totalDataCount,this.countPerPage);
			setPageChoose(this);
			return scObject(this.countPerPage,this.currentPage);
		}
		this.next = function(){
			if ((this.currentPage + 1) * this.countPerPage < this.totalDataCount){
				this.currentPage += 1 ; 
			}
			setPageChoose(this);
			return scObject(this.countPerPage,this.currentPage);
		}
		this.prev = function(){
			if (this.currentPage > 0 ){
				this.currentPage -= 1 ; 
			}
			setPageChoose(this);
			return scObject(this.countPerPage,this.currentPage);
		}
		this.goPage = function(page){
			// argument page value scope : [1,endPage+1]
			// variable currentPage : [0:endPage]
			var endPage = getEndPage(this.totalDataCount,this.countPerPage);
			if (isNaN(page) || page < 1 ){
				this.currentPage = 0 ;
			}else if (page > endPage + 1){
				this.currentPage = endPage ;
			}else{
				this.currentPage = (page - 1 ) / 1 ; // expected as a integer
			}
			setPageChoose(this);
			return scObject(this.countPerPage,this.currentPage);
		}
	}
	function scObject(countPerPage,pageindex){
		return {'start' : countPerPage * pageindex,
				'count' : countPerPage };
	}
	function getEndPage(total,count){
		var d = total % count ;
		if (d == 0){
			return total / count - 1 ;
		}else{
			return (total - d) / count ;
		}
	}
	function setPageChoose(pageMgr){ // depends on currentPage
		var endPage = getEndPage(pageMgr.totalDataCount,pageMgr.countPerPage);
		$("div#pageChoose span").first().text(pageMgr.currentPage + 1);
		$("div#pageChoose span#endPageIndex").text(endPage + 1);
		showAnchors((pageMgr.currentPage > 0),
					(pageMgr.currentPage > 1),
					(pageMgr.currentPage < endPage - 1),
					(pageMgr.currentPage < endPage));
	}
	function showAnchors(show1,show2,show3,show4){
		if (arguments.length === 4 ){
			var anchors = $("div#pageChoose").children("a");
			for (var i = 0 ; i < arguments.length ; i++ ){
				anchors[i].hidden = !arguments[i];
			}
		}
	}