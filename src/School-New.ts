/// Usage:
/*
const school = new School(schoolCode: string)
    .then(res => console.log(res.schoolName))
    .catch(err => console.log(err.message))
*/



class School {
    /// Outline
    // Get server from School.FromCode
    // Get School details from EduLink.SchoolDetails
    readonly schoolCode: string;

    public request() {
        return new Promise((resolve, reject) => {

        });
    }
}