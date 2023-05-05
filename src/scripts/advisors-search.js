import Vue from 'vue';
import axios from 'axios';

class AdvisorsSearch {
	constructor() {
		this.init();
	}

	init() {
		var _this = this;

		var advisorsList = Vue.component('advisors-list', {
			props: ['advisors', 'advisorType', 'filteredAdvisors', 'pagedAdvisors'],
			data: function () {
				return {
					
				}
			},
			mounted() {
				var _this = this;
			},
			template: `
			<div class="advisors-list-wrapper">
				<div class="number-found"><span class="number">{{filteredAdvisors.length}}</span> Advisors Found</div>
				<div class="advisors-list">
					<article class="advisor" v-for="advisor in pagedAdvisors()">
						<div class="col content-col">
							<div class="content">
								<h2 class="h3 heading">
									<a :href="advisor.url">
										<span class="first-name">{{advisor.advisorFirstName}}</span>
										<span class="last-name">{{advisor.advisorLastName}}</span>
									</a>
								</h2>
								<p class="title">{{advisor.title}}</p>
								<p class="phone" v-if="advisor.phoneNumbers[0]">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M3.51667 6.99167C4.71667 9.35 6.65 11.275 9.00833 12.4833L10.8417 10.65C11.0667 10.425 11.4 10.35 11.6917 10.45C12.625 10.7583 13.6333 10.925 14.6667 10.925C15.125 10.925 15.5 11.3 15.5 11.7583V14.6667C15.5 15.125 15.125 15.5 14.6667 15.5C6.84167 15.5 0.5 9.15833 0.5 1.33333C0.5 0.875 0.875 0.5 1.33333 0.5H4.25C4.70833 0.5 5.08333 0.875 5.08333 1.33333C5.08333 2.375 5.25 3.375 5.55833 4.30833C5.65 4.6 5.58333 4.925 5.35 5.15833L3.51667 6.99167Z" fill="#FF9E18"/>
									</svg>																				
									<span class="text" v-if="advisor.phoneNumbers[0]"><a :href="'tel:' + advisor.phoneNumbers[0].phoneNumber">{{advisor.phoneNumbers[0].phoneNumber}}</a></span>
								</p>
								<p class="email" v-if="advisor.email">
									<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M3.16732 3.16663H15.834C16.7048 3.16663 17.4173 3.87913 17.4173 4.74996V14.25C17.4173 15.1208 16.7048 15.8333 15.834 15.8333H3.16732C2.29648 15.8333 1.58398 15.1208 1.58398 14.25V4.74996C1.58398 3.87913 2.29648 3.16663 3.16732 3.16663Z" stroke="#FF9E18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M17.4173 4.75L9.50065 10.2917L1.58398 4.75" stroke="#FF9E18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>										
									<span class="text"><a :href="'mailto:' + advisor.email">Email {{advisor.advisorFirstName}}</a></span>
								</p>
							</div>
						</div>
						<div class="col image-col">
							<div class="image" v-if="advisor.image">
								<a :href="advisor.url"><img :src="advisor.image + '?width=800&quality=80'" /></a>
							</div>
						</div>
					</article>
				</div>
			</div>
			`
		})

		var filterByType = Vue.component('filter-by-type', {
			props: ['advisors','advisorType','filteredAdvisors'],
			data: function () {
				return {
					advisorTypeFilter	: this.advisorType,
					advisorQuery		: this.advisorSearch,
					types				: {
						personalIns			: {
								value	: 'personal-insurance',
								label	: 'Personal Insurance'
							},
						businessIns			: {
								value	: 'business-insurance',
								label	: 'Business Insurance'
							},
						employeeBenefits	: {
								value	: 'employee-benefits',
								label	: 'Employee Benefits'
							},
						specialtyItems		: {
								value	: 'specialty-items',
								label	: 'Specialty Items'
							},
						associations		:{
								value	: 'associations',
								label	: 'Associations'
							},
					}
				}
			},
			mounted() {
				var _this = this;
			},
			watch: {
				advisorType() {
					this.advisorTypeFilter = this.advisorType;
					this.onTypeClicked();
				}
			},
			methods: {
				onTypeChanged(val) {
					const _this = this

					if (typeof val !== 'undefined') {
						this.advisorTypeFilter = val;
						this.$emit('type-changed', val);
					} else {
						this.$emit('type-changed', this.advisorTypeFilter);
					}

					return false;
				},
				onTypeClicked(value) {
					const _this = this;
					if (this.advisorTypeFilter == value) {
						this.advisorTypeFilter = [];
						this.onTypeChanged();
                    }

					return false;
				},
				clearSearch() {
					this.advisorQuery = '';
					this.$emit('query-changed', this.advisorQuery);
				},
				onQueryChanged() {
					const _this = this
					this.$emit('query-changed', this.advisorQuery);

					return false;
				}
			},
			template: `
				<div class="filter-by-type">
					<h3 class="heading">
						Filter by Solution
						<div class="clear-type" v-if="advisorTypeFilter != [] && advisorTypeFilter != ''" v-on:click="onTypeChanged([])">&times; Clear Solution</div>
					</h3>
					<div class="types">
						<div class="type" v-for="type in types">
							<label><input type="checkbox" :name="type.value" :value="type.value" v-on:change="onTypeChanged()" v-on:click="onTypeClicked(type.value)" v-model="advisorTypeFilter" /><div class="tag">{{type.label}}</div></label>
						</div>
					</div>
					<div class="label">Type</div>
					<div class="field select type-select">
						<div class="select-input">
							<select v-model="advisorTypeFilter" v-on:change="onTypeChanged()">
								<option value=""></option>
								<option :value="type.value" v-for="type in types">{{type.label}}</option>
							</select>
						</div>
					</div>
					<div class="search">
						<input type="text" placeholder="Search by name" v-model="advisorQuery" v-on:keypress="onQueryChanged()">
						<div class="submit button" v-on:click="onQueryChanged()">go</div>
						<div class="clear" v-if="advisorQuery != null && advisorQuery != ''" v-on:click="clearSearch()">&times;</div>
					</div>
				</div>
			`
		})

		var filterByCat = Vue.component('filter-by-cat', {
			props: ['advisors', 'regions', 'advisorLocation', 'advisorIndustry', 'filteredAdvisors'],
			data: function () {
				return {
					advisorLocationFilter: this.advisorLocation,
					advisorIndustryFilter: this.advisorIndustry
				}
			},
			mounted() {
				var _this = this;
			},
			filters: {
				replace: function (st, rep, repWith) {
					const result = st.split(rep).join(repWith)
					return result;
				}
			},
			methods: {
				onLocationChanged(val) {
					const _this = this

					if (typeof val !== 'undefined') {
						this.advisorLocationFilter = val;
						this.$emit('location-changed', val);
					} else {
						this.$emit('location-changed', this.advisorLocationFilter);
					}

					return false;
				},
				locationsToggle(event) {
					if (event.target.classList.value.includes('open')) {
						event.target.classList.remove('open');
						event.target.nextElementSibling.style.display = 'none';
					} else {
						event.target.classList.add('open');
						event.target.nextElementSibling.style.display = 'block';
					}
				},
				onIndustryChanged(val) {
					const _this = this;

					if (typeof val !== 'undefined') {
						this.advisorIndustryFilter = val;
						this.$emit('industry-changed', val);
					} else {
						this.$emit('industry-changed', this.advisorIndustryFilter);
					}

					return false;
				},
				clearSelections() {
					this.onLocationChanged([]);
					this.onIndustryChanged([]);
				}
			},
			template: `
				<div class="col filter-by-cat-col">
					<header class="header" data-filter-trigger>
						<h3 class="heading">Filter by Categories</h3>
						<div class="clear-location" v-on:click="clearSelections()" v-if="advisorLocationFilter.length || advisorIndustryFilter.length">&times; Clear Selections</div>
						<div class="label">
							<div class="selection" v-if="advisorLocationFilter.length">Region: <span v-for="(item, index) in advisorLocationFilter"><span class="separator" v-if="index != 0">, </span>{{item | replace('-',' ')}}</span></div>
							<div class="selection" v-if="advisorIndustryFilter.length">Industry: <span v-for="(item, index) in advisorIndustryFilter"><span class="separator" v-if="index != 0">, </span>{{item | replace('-',' ')}}</span></div>
						</div>
					</header>
					<section class="cat-group">
						<h4 class="heading">Region</h4>
						<div class="region" v-for="region in regions">
							<div class="field">
								<label><input type="checkbox" :name="region.alias" :value="region.alias" v-on:change="onLocationChanged()" v-model="advisorLocationFilter" /><div class="radio-button"></div><span class="text">{{region.name}}</span></label>
							</div>
							<div class="slide-trigger" v-on:click="locationsToggle($event)"></div>
							<div class="locations">
								<h6 class="heading">Office Locations</h6>
								<ul class="locations-list">
									<li v-for="location in region.locations">{{location.name}}</li>
								</ul>
							</div>
						</div>
					</section>
					<!--<section class="cat-group">
						<h4 class="heading">Industry</h4>
						<div class="field">
							<label><input type="checkbox" name="manufacturing" value="manufacturing" v-on:change="onIndustryChanged()" v-model="advisorIndustryFilter" /><div class="radio-button"></div><span class="text">Manufacturing</span></label>
						</div>
						<div class="field">
							<label><input type="checkbox" name="transportation" value="transportation" v-on:change="onIndustryChanged()" v-model="advisorIndustryFilter" /><div class="radio-button"></div><span class="text">Transporation</span></label>
						</div>
						<div class="field">
							<label><input type="checkbox" name="construction" value="construction" v-on:change="onIndustryChanged()" v-model="advisorIndustryFilter" /><div class="radio-button"></div><span class="text">Construction</span></label>
						</div>
						<div class="field">
							<label><input type="checkbox" name="retail" value="retail" v-on:change="onIndustryChanged()" v-model="advisorIndustryFilter" /><div class="radio-button"></div><span class="text">Retail</span></label>
						</div>
						<div class="field">
							<label><input type="checkbox" name="farming" value="farming" v-on:change="onIndustryChanged()" v-model="advisorIndustryFilter" /><div class="radio-button"></div><span class="text">Farming</span></label>
						</div>
						<div class="field">
							<label><input type="checkbox" name="tech-sector" value="tech-sector" v-on:change="onIndustryChanged()" v-model="advisorIndustryFilter" /><div class="radio-button"></div><span class="text">Tech Sector</span></label>
						</div>
						<div class="field">
							<label><input type="checkbox" name="other-industries" value="other-industries" v-on:change="onIndustryChanged()" v-model="advisorIndustryFilter" /><div class="radio-button"></div><span class="text">Other Industries</span></label>
						</div>
					</section>-->
				</div>
			`
		});

		var pagination = Vue.component('pagination', {
			props: ['filteredAdvisors', 'pageLength', 'nextPage', 'curPage'],
			data: function () {
				return {
				}
			},
			mounted() {
				var _this = this;
			},
			template: `
				<section class="component pagination" data-transition v-if="filteredAdvisors.length > pageLength">
					<div class="back-next-nav">
						<a class="back-next back" v-on:click="nextPage(curPage-1)" v-if="curPage > 0">Back</a>
					</div>
					<ul class="page-list">
						<li class="page-item" v-bind:class="{active:curPage == i}" v-for="(page, i) in Math.ceil(filteredAdvisors.length/pageLength)" v-if="i > curPage - 3 && i < curPage + 3">
							<a class="page-link" v-on:click="nextPage(i)">{{i+1}}</a>
						</li>
					</ul>
					<div class="back-next-nav">
						<a class="back-next next" v-on:click="nextPage(curPage+1)" v-if="curPage+1 < Math.ceil(filteredAdvisors.length/pageLength)">Next</a>
					</div>
				</section>
			`
		})

		const app = new Vue({
			el: '#advisors',
			components: { advisorsList, filterByType, filterByCat, pagination},
			data: {
				advisors: [],
				filteredAdvisors: [],
				regions: [],
				advisorType: [],
				advisorLocation: [],
				advisorIndustry: [],
				pageLength: 9,
				curPage: 0,
			},
			mounted() {
				var _this = this;

				var advisorsPromise = new Promise((resolve) => {
					_this.getAdvisors(resolve);
				});

				advisorsPromise.then((data) => {
					this.advisors = data;
					this.filteredAdvisors = data;
				});

				var regionsPromise = new Promise((resolve) => {
					_this.getRegions(resolve);
				});

				regionsPromise.then((data) => {
					this.regions = data;
				});
			},
			methods: {
				getAdvisors(resolve) {
					axios({
						method: "get",
						url: "/umbraco/api/advisors/getAdvisors",
						headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" },
					})
						.then(function (response) {
							//handle success
							resolve(response.data);
						})
						.catch(function (response) {
							//handle error
							console.log(response);
						});
				},

				getRegions(resolve) {
					axios({
						method: "get",
						url: "/umbraco/api/regions/getRegions",
						headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" },
					})
						.then(function (response) {
							//handle success
							resolve(response.data);
						})
						.catch(function (response) {
							//handle error
						});
				},

				updateType(advisorType) {
					this.advisorType = advisorType;

					this.filterAdvisors();
				},
				updateLocation(advisorLocation) {
					this.advisorLocation = advisorLocation;

					this.filterAdvisors();
				},
				updateSearch(advisorSearch) {
					this.advisorSearch = advisorSearch;

					this.filterAdvisors();
				},
				updateIndustry(advisorIndustry) {
					this.advisorIndustry = advisorIndustry;

					this.filterAdvisors();
				},
				filterAdvisors() {
					var _this = this;

					var _filtered = advisors;

					var advisorsPromise = new Promise((resolve) => {
						_this.getAdvisors(resolve);
					});

					advisorsPromise.then((data) => {
						_filtered = data;

						//Filter by Type
						if (this.advisorType != '') {
							_filtered = _filtered.filter(advisor => this.advisorType.indexOf(advisor.solutions.toLowerCase().replaceAll(' ', "-")) > -1);
						}

						//Filter by Location
						if (this.advisorLocation != '') {
							const location = this.advisorLocation;
							let remove = [];
							const isInLocationFilter = (advisorLocation) => location.indexOf(advisorLocation) > -1;

							_filtered.forEach((advisor, i) => {
								var advisorLocation = advisor.location.split(',');

								if (!advisorLocation.some(isInLocationFilter)) {
									remove.push(i);
								}
							});
							_filtered = _filtered.filter((advisor,i) => remove.indexOf(i) == -1);
						}

						//Filter by Industry
						if (this.advisorIndustry != '') {
							_filtered = _filtered.filter(advisor => this.advisorIndustry.some(x => advisor.industrys.includes(x)));
						}

						//Filter by Search
						if (this.advisorSearch != '' && typeof this.advisorSearch !== 'undefined') {
							_filtered = _filtered.filter(advisor => (advisor.advisorFirstName.toLowerCase() + advisor.advisorLastName.toLowerCase()).includes(this.advisorSearch.toLowerCase()));
						}

						this.filteredAdvisors = _filtered;
						_this.nextPage(0);
					});
				},
				nextPage(page) {
					let _next = page == this.filteredAdvisors.length ? 0 : page;
					_next = page < 0 ? this.filteredAdvisors.length - 1 : page;

					this.curPage = page;
				},
				pagedAdvisors() {
					const _this = this;

					let _paged = [];
					return this.filteredAdvisors.slice(this.curPage * this.pageLength, this.curPage * this.pageLength + this.pageLength)
				},
			},
			computed: {
			},
		})
	}
}

export default AdvisorsSearch