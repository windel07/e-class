const states = {
    apiData     : {
        source      : '',
        active      : null,
        datas       : []
    },
    template    : {
        noSidebar   : false,
        isLoading   : false
    },
    user        : {
        token       : localStorage.getItem('eclass_token') || null,
        data        : null
    },
    options     : {
        genders     : [
            { text: 'Male', value: 'm' },
            { text: 'Female', value: 'f' }
        ],
        roles       : [
            { text: 'Administrator', value: 'administrator' },
            { text: 'Program Head', value: 'program-head' },
            { text: 'Chief Adviser', value: 'chief-adviser' },
            { text: 'Teacher', value: 'teacher' }
        ],
        academic_years  : [],
        tracks          : [],
        strands         : [],
        sections        : [],
        subjects        : [],
        subject_tracks  : [],
        levels          : [],
        years           : [],
        advisers        : [],
        semesters       : [
            { text: 'First Semester', value: 1 },
            { text: 'Second Semester', value: 2 }
        ]
    },
    settings    : localStorage.getItem('eclass_settings') || {}
}

export default states