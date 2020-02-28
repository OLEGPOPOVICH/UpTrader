"use strict";
$(document).ready(function(){
	setBodyClass("show");
});

//= parts/common.js

(function() {
	checkActiveItems();
	let tabs = document.querySelectorAll("[data-tab]");
	if(tabs) {
		tabs.forEach( tab => {
			tab.addEventListener("click", eventTab, false);
		})
	}

	function eventTab() {
		setActiveTab(this);
		setActiveTabContent(this);
	}

	function setActiveTab(self, scroll = true) {
		let activeTabs = document.querySelectorAll(".tab-active");
		if(activeTabs) {
			activeTabs.forEach(activeTab => {
				activeTab.classList.remove("tab-active");
			});
		}

		let currentTab = self.dataset.tab;
		let currentLink = self.dataset.link;
		let currentBtn = self.dataset.btn;
		let currentItem = self.dataset.item;

		if(currentTab) {
			self.classList.add("tab-active");
			if(scroll){
				scrollPostById(self.offsetTop);
			}
		} else if(currentLink) {
			let tab = document.querySelector("[data-tab='" + currentLink + "']");
			if(tab) {
				tab.classList.add("tab-active");
				if(scroll){
					scrollPostById(tab.offsetTop);
				}
			}
		} else if(currentBtn) {
			let tab = document.querySelector("[data-tab='" + currentBtn + "']");
			if(tab) {
				tab.classList.add("tab-active");
				if(scroll){
					scrollPostById(tab.offsetTop);
				}
			}
		} else if(currentItem) {
			let tab = document.querySelector("[data-tab='" + currentItem + "']");
			if(tab) {
				tab.classList.add("tab-active");
				if(scroll){
					scrollPostById(tab.offsetTop);
				}
			}
		}
	}

	function setActiveTabContent(self) {
		let activeTabItems = document.querySelectorAll(".tab__item-active");
		if(activeTabItems) {
			activeTabItems.forEach( activeTabItem => {
				activeTabItem.classList.remove("tab__item-active");
			});
		}
		let currentTab = self.dataset.tab;
		let currentLink = self.dataset.link;
		let currentBtn = self.dataset.btn;
		let currentItem = self.dataset.item;
		if(currentTab) {
			let tabItem = document.querySelector("[data-item='" + currentTab + "'");
			if(tabItem) {
				tabItem.classList.add("tab__item-active");
			}
		} else if(currentLink) {
			let tabItem = document.querySelector("[data-item='" + currentLink + "'");
			if(tabItem) {
				tabItem.classList.add("tab__item-active");
			}
		}  else if(currentBtn) {
			let tabItem = document.querySelector("[data-item='" + currentBtn + "'");
			if(tabItem) {
				tabItem.classList.add("tab__item-active");
			}
		} else if(currentItem) {
			let tabItem = document.querySelector("[data-item='" + currentItem + "'");
			if(tabItem) {
				tabItem.classList.add("tab__item-active");
			}
		}
	}

	let links = document.querySelectorAll("[data-link]");
	if(links) {
		links.forEach( link => {
			link.addEventListener("click", eventLink, false);
		})
	}
	function eventLink() {
		setActiveTab(this);
		setActiveTabContent(this);
	}

	let btns = document.querySelectorAll("[data-btn]");
	if(btns) {
		btns.forEach( btn => {
			btn.addEventListener("click", eventBtn, false);
		})
	}

	function eventBtn() {
		toggleActiveTabContent(this);
	}

	function toggleActiveTabContent(self) {
		let tabItem = self.parentElement;
		if(tabItem) {
			if(tabItem.classList.contains("tab__item-active")) {
				tabItem.classList.remove("tab__item-active");
				self.classList.remove("tab__btn-active");
				checkActiveItems();
			} else {
				tabItem.classList.add("tab__item-active");
				self.classList.add("tab__btn-active");
				setBodyClass("body-earning");
			}
		}
	}


	$(window).on('resize', function(){
		checkActiveItems();
	});

	function checkActiveItems() {
		let tabItems = document.querySelectorAll("[data-item]");
	
		if(tabItems) {
			let activeFlag = false;
			for(let i = 0; i < tabItems.length; i++) {
				if(tabItems[i].classList.contains("tab__item-active")) {
					if(checkWidthScreen("<", "880")) {
						setBodyClass("body-earning");
					}
					activeFlag = true;
					break;
				}
			}

			if(!activeFlag) {
				if(checkWidthScreen(">", "880")) {
					tabItems[0].classList.add("tab__item-active");
					setActiveTab(tabItems[0], false);
					setActiveTabContent(tabItems[0]);
				} else {
					removeClass(document.body, "body-earning");
				}
			} else {
				if(checkWidthScreen(">", "880")) {
					let tabItemsActive = document.querySelectorAll(".tab__item-active");
					if(tabItemsActive) {
						setActiveTab(tabItemsActive[0]);
						setActiveTabContent(tabItemsActive[0]);
					}
				}
			}
		}
	}
}());