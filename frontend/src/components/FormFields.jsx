export const CourseSelectionField = ({ options, formData, handleChange }) => (
  <div className="bg-blue-50 p-4 rounded-lg">
    <label className="block text-gray-700 font-semibold mb-3">
      เลือกหลักสูตรที่ต้องการสมัคร <span className="text-red-500">*</span>
    </label>
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-start">
          <input
            type="radio"
            name="courseType"
            value={option.value}
            checked={formData.courseType === option.value}
            onChange={handleChange}
            required
            className="mt-1 mr-2"
          />
          <div className="text-sm">
            <div>{option.label}</div>
            {option.date && <div className="text-gray-600">📅 {option.date}</div>}
            {option.location && <div className="text-gray-600">📍 {option.location}</div>}
            {option.duration && <div className="text-gray-600">⏱️ {option.duration}</div>}
            {option.requirement && (
              <div className="text-blue-600 text-xs mt-1">
                ⚠️ คุณสมบัติ: {option.requirement}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  </div>
);

export const PersonalInfoFields = ({ formData, handleChange, showAge = false }) => (
  <div className="border-t pt-4">
    <h4 className="font-semibold text-lg text-gray-800 mb-4">ข้อมูลส่วนตัว</h4>
    
    <div className="grid grid-cols-4 gap-3 mb-3">
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          คำนำหน้า <span className="text-red-500">*</span>
        </label>
        <select
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
        >
          <option value="">เลือก</option>
          <option value="นาย">นาย</option>
          <option value="นาง">นาง</option>
          <option value="นางสาว">นางสาว</option>
        </select>
      </div>
      
      <div className="col-span-3">
        <label className="block text-gray-700 text-sm mb-2">
          ชื่อ <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="กรอกชื่อ"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-3">
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          นามสกุล <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="กรอกนามสกุล"
        />
      </div>
      
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          ศาสนา <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="เช่น พุทธ"
        />
      </div>
    </div>

    <div className={`grid ${showAge ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mb-3`}>
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          วัน เดือน ปีเกิด <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
        />
      </div>
      
      {showAge && (
        <div>
          <label className="block text-gray-700 text-sm mb-2">
            อายุ (ปี) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
            placeholder="อายุ"
          />
        </div>
      )}
    </div>

    <div>
      <label className="block text-gray-700 text-sm mb-2">
        เลขประจำตัวประชาชน <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="idCard"
        value={formData.idCard}
        onChange={handleChange}
        required
        maxLength="13"
        pattern="[0-9]{13}"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
        placeholder="เลข 13 หลัก (ไม่ต้องใส่ขีด)"
      />
    </div>
  </div>
);

export const EducationFields = ({ formData, handleChange }) => (
  <div className="border-t pt-4">
    <h4 className="font-semibold text-lg text-gray-800 mb-4">วุฒิการศึกษา</h4>
    
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          วุฒิการศึกษาสูงสุด <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="เช่น ปริญญาตรี"
        />
      </div>
      
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          วิชาเอก <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="เช่น การศึกษา"
        />
      </div>
    </div>
  </div>
);

// Contact Fields
export const ContactFields = ({ formData, handleChange }) => (
  <div className="border-t pt-4">
    <h4 className="font-semibold text-lg text-gray-800 mb-4">ข้อมูลการติดต่อ</h4>
    
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          เบอร์โทรศัพท์มือถือ <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="mobilePhone"
          value={formData.mobilePhone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="0xx-xxx-xxxx"
        />
        <p className="text-xs text-gray-500 mt-1">ใช้เพื่อติดต่อประสานงาน</p>
      </div>
      
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          LINE ID <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="lineId"
          value={formData.lineId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="LINE ID"
        />
        <p className="text-xs text-gray-500 mt-1">ใช้เพื่อเข้ากลุ่มไลน์สำหรับผู้อบรม</p>
      </div>
    </div>
  </div>
);

// Work Info Fields
export const WorkInfoFields = ({ formData, handleChange, phoneFieldName = 'officePhone' }) => (
  <div className="border-t pt-4">
    <h4 className="font-semibold text-lg text-gray-800 mb-4">ข้อมูลการทำงาน</h4>
    
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          ตำแหน่ง <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="เช่น ครู"
        />
      </div>
      
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          วิทยฐานะ
        </label>
        <input
          type="text"
          name="academicLevel"
          value={formData.academicLevel}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="เช่น ชำนาญการ"
        />
      </div>
    </div>

    <div className="mb-3">
      <label className="block text-gray-700 text-sm mb-2">
        โรงเรียน <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="school"
        value={formData.school}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
        placeholder="ชื่อโรงเรียน"
      />
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          สังกัดสำนักงานเขต <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="เช่น เขตบางกอกใหญ่"
        />
      </div>
      
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          เบอร์โทรศัพท์{phoneFieldName === 'schoolPhone' ? 'โรงเรียน' : 'หน่วยงาน'}
        </label>
        <input
          type="tel"
          name={phoneFieldName}
          value={formData[phoneFieldName]}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="0x-xxx-xxxx"
        />
      </div>
    </div>
  </div>
);

// Scout Previous Training Fields
export const ScoutPreviousTrainingFields = ({ formData, handleChange }) => (
  <div className="border-t pt-4">
    <h4 className="font-semibold text-lg text-gray-800 mb-4">ประสบการณ์การฝึกอบรม</h4>
    
    <div className="mb-3">
      <label className="flex items-center">
        <input
          type="checkbox"
          name="hasBasicTraining"
          checked={formData.hasBasicTraining}
          onChange={handleChange}
          className="mr-2"
        />
        <span className="text-gray-700">เคยผ่านการฝึกอบรมลูกเสือขั้นความรู้เบื้องต้น (B.T.C.)</span>
      </label>
    </div>

    {formData.hasBasicTraining && (
      <>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-2">
            ประเภท
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="trainingType"
                value="สำรอง"
                checked={formData.trainingType === 'สำรอง'}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm">สำรอง</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="trainingType"
                value="สามัญ"
                checked={formData.trainingType === 'สามัญ'}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm">สามัญ</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="trainingType"
                value="สามัญรุ่นใหญ่"
                checked={formData.trainingType === 'สามัญรุ่นใหญ่'}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm">สามัญรุ่นใหญ่</span>
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-2">
            สถานที่ฝึกอบรม
          </label>
          <input
            type="text"
            name="trainingLocation"
            value={formData.trainingLocation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
            placeholder="สถานที่ที่เคยฝึกอบรม"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">
            ระหว่างวันที่
          </label>
          <input
            type="text"
            name="trainingDate"
            value={formData.trainingDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
            placeholder="เช่น 1-7 มกราคม 2568"
          />
        </div>
      </>
    )}
  </div>
);

// Red Cross Previous Training Fields
export const RedCrossPreviousTrainingFields = ({ formData, handleChange }) => (
  <div className="border-t pt-4">
    <h4 className="font-semibold text-lg text-gray-800 mb-4">ประสบการณ์การฝึกอบรม</h4>
    
    <div className="mb-3">
      <label className="flex items-center">
        <input
          type="checkbox"
          name="hasPreviousTraining"
          checked={formData.hasPreviousTraining}
          onChange={handleChange}
          className="mr-2"
        />
        <span className="text-gray-700">ผ่านการฝึกอบรมยุวกาชาดมาก่อน</span>
      </label>
    </div>

    {formData.hasPreviousTraining && (
      <>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-2">
            หลักสูตรที่ผ่านการฝึกอบรม
          </label>
          <input
            type="text"
            name="previousTrainingCourse"
            value={formData.previousTrainingCourse}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
            placeholder="เช่น หลักสูตรครูผู้สอนกิจกรรมยุวกาชาด"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-2">
            เลขที่รุ่น
          </label>
          <input
            type="text"
            name="previousTrainingNumber"
            value={formData.previousTrainingNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
            placeholder="เลขที่รุ่น"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-2">
            สถานที่ฝึกอบรม
          </label>
          <input
            type="text"
            name="previousTrainingLocation"
            value={formData.previousTrainingLocation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
            placeholder="สถานที่ที่เคยฝึกอบรม"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">
            ระหว่างวันที่
          </label>
          <input
            type="text"
            name="previousTrainingDate"
            value={formData.previousTrainingDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
            placeholder="เช่น 1-7 มกราคม 2568"
          />
        </div>
      </>
    )}
  </div>
);

// Health Fields
export const HealthFields = ({ formData, handleChange, showHealthCondition = true }) => (
  <div className="border-t pt-4">
    <h4 className="font-semibold text-lg text-gray-800 mb-4">
      {showHealthCondition ? 'สุขภาพและอาหาร' : 'อาหาร'}
    </h4>
    
    {showHealthCondition && (
      <div className="mb-3">
        <label className="block text-gray-700 text-sm mb-2">
          โรคประจำตัว (ถ้ามี)
        </label>
        <textarea
          name="healthCondition"
          value={formData.healthCondition}
          onChange={handleChange}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="ระบุโรคประจำตัว หรือเว้นว่างไว้หากไม่มี"
        />
      </div>
    )}

    <div>
      <label className="block text-gray-700 text-sm mb-2">
        อาหารที่ไม่รับประทาน หรือแพ้
      </label>
      <textarea
        name="foodRestrictions"
        value={formData.foodRestrictions}
        onChange={handleChange}
        rows="2"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
        placeholder="ระบุอาหารที่ไม่รับประทาน หรือเว้นว่างไว้หากไม่มี"
      />
    </div>
    
    <p className="text-xs text-gray-500 mt-2">
      หมายเหตุ: ผู้สมัครต้องมีสุขภาพแข็งแรงสมบูรณ์ ไม่มีโรคประจำตัวที่ร้ายแรง อันเป็นอุปสรรคต่อการฝึกอบรม
    </p>
  </div>
);

// Agreement Field
export const AgreementField = ({ formData, handleChange }) => (
  <div className="border-t pt-4">
    <label className="flex items-start">
      <input
        type="checkbox"
        name="agreeToRules"
        checked={formData.agreeToRules}
        onChange={handleChange}
        required
        className="mt-1 mr-2"
      />
      <span className="text-gray-700">
        ข้าพเจ้าทราบระเบียบและจะปฏิบัติตามกฎของการฝึกอบรมทุกประการ และสามารถเข้ารับการฝึกอบรมได้ตลอดหลักสูตร <span className="text-red-500">*</span>
      </span>
    </label>
  </div>
);