export const fixedSubCourses = {
  scout: [
    { value: 'btc-samrong',     label: 'การฝึกอบรมผู้กำกับลูกเสือสำรอง ขั้นความรู้เบื้องต้น (B.T.C.)' },
    { value: 'btc-samanya',     label: 'การฝึกอบรมผู้กำกับลูกเสือสามัญ ขั้นความรู้เบื้องต้น (B.T.C.)' },
    { value: 'btc-samanya-yai', label: 'การฝึกอบรมผู้กำกับลูกเสือสามัญรุ่นใหญ่ ขั้นความรู้เบื้องต้น (B.T.C.)' },
    { value: 'latc',            label: 'การฝึกอบรมบุคลากรทางการลูกเสือระดับผู้นำ (L.A.T.C.)' },
  ],
  redcross: [
    { value: 'rcy-teacher', label: 'หลักสูตรครูผู้สอนกิจกรรมยุวกาชาด', requirement: 'ยังไม่เคยผ่านการอบรมหลักสูตรครูผู้สอนกิจกรรมยุวกาชาด' },
    { value: 'rcy-leader',  label: 'หลักสูตรผู้นำยุวกาชาด', requirement:'ผ่านการอบรมหลักสูตรครูผู้สอนกิจกรรมยุวกาชาดมาแล้ว' },
    { value: 'rcy-trainer', label: 'หลักสูตรผู้ให้การอบรมเจ้าหน้าที่และผู้บังคับบัญชายุวกาชาด', requirement:'ผ่านการอบรมหลักสูตรผู้นำยุวกาชาด หรือหลักสูตรผู้บริหารงานยุวกาชาดมาแล้ว' },
    { value: 'rcy-manager', label: 'หลักสูตรผู้บริหารงานยุวกาชาด', requirement: 'ผ่านการอบรมหลักสูตรผู้นำยุวกาชาดมาแล้ว (ยกเว้นเป็นผู้บริหารสถานศึกษา)' },
  ],
};

export const getSubCourseLabel = (value) => {
	const all = [...fixedSubCourses.scout, ...fixedSubCourses.redcross];
	return all.find(c => c.value === value)?.label || value;
}