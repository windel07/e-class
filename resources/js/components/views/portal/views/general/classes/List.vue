<template>
    <div>
        <vs-row v-if="'administrator' == user.role" class="mb-3">
            <vs-col>
                <vs-button @click="$router.push({ name: 'class_new' })">Add New</vs-button>
            </vs-col>
        </vs-row>
        
        <app-table :headers="headers" source="classes" title="Classes">
            <template v-slot:academic_year_id="academic_year">
                <span v-if="academic_year.td.val">{{ academic_year.td.val.year }} - {{ academic_year.td.val.year + 1 }}</span>
            </template>
            <template v-slot:subject_id="subject">{{ subject.td.val ? subject.td.val.name : '' }}</template>
            <template v-slot:level_id="level">{{ level.td.val ? level.td.val.name : '' }}</template>
            <template v-slot:section_id="section">{{ section.td.val ? section.td.val.name : '' }}</template>
            <template v-slot:strand_id="strand">{{ strand.td.val ? strand.td.val.code : '' }}</template>
            <template v-slot:semester="semester">{{ 1 == semester.td.val ? 'First' : 'Second' }} Semester</template>
            <template v-if="'teacher' == user.role" v-slot:actions>
                <span></span>
            </template>
        </app-table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Table from 'Views/portal/partials/Table.vue'

    export default {
        components      : {
            'app-table'     : Table
        },
        data() {
            return  {
                headers     : [
                    { key: 'name', text: 'Class Name' },
                    { key: 'subject_id', text: 'Subject' },
                    { key: 'level_id', text: 'Grade' },
                    { key: 'section_id', text: 'Section' },
                    { key: 'strand_id', text: 'Strand' },
                    { key: 'hours', text: 'Hours' },
                    { key: 'academic_year_id', text: 'Academic Year' },
                    { key: 'semester', text: 'Semester' },
                ]
            }
        },
        computed    : {
            ...mapGetters([
                'user'
            ])
        }
    }
</script>