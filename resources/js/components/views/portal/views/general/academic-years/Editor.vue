<template>
    <div>
        <vs-row class="mb-4">
            <vs-col>
                <h3 class="my-1 float-left">{{ $route.params.id ? 'Update' : 'New' }} Academic Year</h3>
                <vs-button v-if="$route.params.id" @click="$router.push({ name: 'academic-years_new' })" class="float-right">Add New</vs-button>
            </vs-col>
        </vs-row>

        <form @submit.prevent="$route.params.id ? update() : create()">
            <vs-row>
                <vs-col vs-xs="12" vs-sm="7" vs-lg="9">
                    <vs-card>
                        <p class="mb-3">
                            <router-link :to="{ name: 'academic-years' }">
                                <small>&laquo; Return to all academic years</small>
                            </router-link>
                        </p>

                        <vs-row>
                            <vs-col vs-xs="12" vs-sm="6" vs-lg="6">
                                <div class="vs-component vs-con-input-label">
                                    <label for="academic-year" class="vs-input--label">Academic Year</label>
                                    <v-datepicker v-model="models.academic_year.year" minimumView="year" initialView="year" format="yyyy" input-class="vs-input--input" id="academic-year" class="mb-3"></v-datepicker>
                                </div>
                            </vs-col>
                        </vs-row>
                    </vs-card>
                </vs-col>
                <vs-col vs-xs="12" vs-sm="5" vs-lg="3">
                    <vs-card>
                        <div>
                            <vs-button button="submit" :disabled="!valid || (0 == settings.status)">{{ $route.params.id ? 'Update' : 'Save' }}</vs-button>
                            <vs-button @click="$router.push({ name: 'academic-years' })" color="grey" class="float-right">Cancel</vs-button>
                        </div>
                    </vs-card>
                </vs-col>
            </vs-row>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { ValidationObserver, ValidationProvider } from 'vee-validate'
    import Datepicker from 'vuejs-datepicker'

    export default {
        components  : {
            'validation-observer'   : ValidationObserver,
            'validation-provider'   : ValidationProvider,
            'v-datepicker'          : Datepicker
        },
        data() {
            return {
                models  : {
                    academic_year   : {}
                }
            }
        },
        methods     : {
            create() {
                this.$store.dispatch('createDataBySource', { source: 'academic_years', data: { year: new Date(this.models.academic_year.year).getFullYear() } }).then(response => {
                    this.$vs.notify({ title: 'Success', text: 'New academic year created.', color: 'success' })

                    this.$router.push({ name: 'academic-years' })
                }).catch(error => {
                    if( 401 == error.response.status ) {
                        this.$vs.notify({ title: 'Warning', text: error.response.data.response, color: 'warning' })
                    }
                })
            },
            update() {
                let data = this.models.academic_year
                data.year = new Date(this.models.academic_year.year).getFullYear()

                this.$store.dispatch('updateDataBySource', { source: 'academic_years', id: this.models.academic_year.id, data: data }).then(response => {
                    this.$vs.notify({ title: 'Success', text: 'Academic year updated.', color: 'success' })

                    this.$router.push({ name: 'academic-years' })
                }).catch(error => {
                    if( 401 == error.response.status ) {
                        this.$vs.notify({ title: 'Warning', text: error.response.data.response, color: 'warning' })
                    }
                })
            }
        },
        computed    : {
            ...mapGetters([
                'settings'
            ]),
            valid() {
                if( !this.models.academic_year.year )
                    return false;

                return true
            }
        },
        created() {
            if( this.$route.params.id ) {
                if( !this.$store.state.apiData.active ) {
                    this.$store.dispatch('getDataBySource', { source: 'academic_years', id: this.$route.params.id }).then(response => {
                        this.models.academic_year = response.data.response
                        this.models.academic_year.year = new Date().setFullYear(this.models.academic_year.year)
                    }).catch(_ => {
                        this.$router.push({ name: 'academic-years' })
                    })
                } else {
                    this.models.academic_year = this.$store.state.apiData.active
                    this.models.academic_year.year = new Date().setFullYear(this.models.academic_year.year)
                }
            }
        }
    }
</script>