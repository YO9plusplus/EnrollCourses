// Work Info Fields
import { useState, useEffect } from 'react';
import { bangkokDistricts, bangkokSchools } from '../data/bangkokSchools';

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
        <select
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--thai-green)"
        >
          <option value="">เลือกศาสนา</option>
          <option value="พุทธ">พุทธ</option>
          <option value="อิสลาม">อิสลาม</option>
          <option value="คริสต์">คริสต์</option>
          <option value="ฮินดู">ฮินดู</option>
          <option value="ซิกข์">ซิกข์</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
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
        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
        >
          <option value="">เลือกวุฒิการศึกษา</option>
          <option value="ต่ำกว่าปริญญาตรี">ต่ำกว่าปริญญาตรี</option>
          <option value="ปริญญาตรี">ปริญญาตรี</option>
          <option value="ปริญญาโท">ปริญญาโท</option>
          <option value="ปริญญาเอก">ปริญญาเอก</option>
        </select>
      </div>
      
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          วิชาเอก <span className="text-red-500">*</span>
        </label>
        <select
          name="major"
          value={formData.major}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
        >
          <option value="">เลือกวิชาเอก</option>
          
          {/* ครุศาสตร์/การศึกษา */}
          <optgroup label="ครุศาสตร์/การศึกษา">
            <option value="การศึกษาปฐมวัย">การศึกษาปฐมวัย</option>
            <option value="การประถมศึกษา">การประถมศึกษา</option>
            <option value="หลักสูตรและการสอน">หลักสูตรและการสอน</option>
            <option value="การบริหารการศึกษา">การบริหารการศึกษา</option>
            <option value="จิตวิทยาการศึกษา">จิตวิทยาการศึกษา</option>
            <option value="เทคโนโลยีการศึกษา">เทคโนโลยีการศึกษา</option>
            <option value="การวัดและประเมินผล">การวัดและประเมินผล</option>
          </optgroup>
          
          {/* ภาษา */}
          <optgroup label="ภาษา">
            <option value="ภาษาไทย">ภาษาไทย</option>
            <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
            <option value="ภาษาจีน">ภาษาจีน</option>
            <option value="ภาษาญี่ปุ่น">ภาษาญี่ปุ่น</option>
            <option value="ภาษาฝรั่งเศส">ภาษาฝรั่งเศส</option>
            <option value="ภาษาอื่นๆ">ภาษาอื่นๆ</option>
          </optgroup>
          
          {/* วิทยาศาสตร์ */}
          <optgroup label="วิทยาศาสตร์">
            <option value="คณิตศาสตร์">คณิตศาสตร์</option>
            <option value="ฟิสิกส์">ฟิสิกส์</option>
            <option value="เคมี">เคมี</option>
            <option value="ชีววิทยา">ชีววิทยา</option>
            <option value="วิทยาศาสตร์ทั่วไป">วิทยาศาสตร์ทั่วไป</option>
            <option value="วิทยาการคอมพิวเตอร์">วิทยาการคอมพิวเตอร์</option>
          </optgroup>
          
          {/* สังคมศาสตร์ */}
          <optgroup label="สังคมศาสตร์">
            <option value="สังคมศึกษา">สังคมศึกษา</option>
            <option value="ประวัติศาสตร์">ประวัติศาสตร์</option>
            <option value="ภูมิศาสตร์">ภูมิศาสตร์</option>
            <option value="เศรษฐศาสตร์">เศรษฐศาสตร์</option>
            <option value="รัฐศาสตร์">รัฐศาสตร์</option>
            <option value="สังคมวิทยา">สังคมวิทยา</option>
            <option value="จิตวิทยา">จิตวิทยา</option>
          </optgroup>
          
          {/* ศิลปะ/ดนตรี/พละ */}
          <optgroup label="ศิลปะและกีฬา">
            <option value="ศิลปศึกษา">ศิลปศึกษา</option>
            <option value="ดนตรีศึกษา">ดนตรีศึกษา</option>
            <option value="นาฏศิลป์">นาฏศิลป์</option>
            <option value="พลศึกษา">พลศึกษา</option>
            <option value="สุขศึกษา">สุขศึกษา</option>
          </optgroup>
          
          {/* อาชีวศึกษา */}
          <optgroup label="อาชีวศึกษา">
            <option value="คหกรรม">คหกรรม</option>
            <option value="เกษตรกรรม">เกษตรกรรม</option>
            <option value="อุตสาหกรรม">อุตสาหกรรม</option>
            <option value="พาณิชยกรรม">พาณิชยกรรม</option>
            <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
          </optgroup>
          
          {/* อื่นๆ */}
          <option value="อื่นๆ">อื่นๆ (โปรดระบุ)</option>
        </select>
      </div>
    </div>
    
    {/* Show text input if "อื่นๆ" is selected for major */}
    {formData.major === 'อื่นๆ' && (
      <div className="mt-3">
        <label className="block text-gray-700 text-sm mb-2">
          โปรดระบุวิชาเอก <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="majorOther"
          value={formData.majorOther || ''}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          placeholder="ระบุวิชาเอก"
        />
      </div>
    )}
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

export const WorkInfoFields = ({ formData, handleChange, phoneFieldName = 'officePhone' }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(formData.district || '');
  const [availableSchools, setAvailableSchools] = useState(
    formData.district ? (bangkokSchools[formData.district] || []) : []
  );

  const academicLevels = {
    'ครู': [
      'ครูผู้ช่วย',
      'ปฏิบัติการ',
      'ชำนาญการ',
      'ชำนาญการพิเศษ',
      'เชี่ยวชาญ'
    ],
    'ผู้บริหาร': [
      'ผู้บริหารสถานศึกษา',
      'ชำนาญการ',
      'ชำนาญการพิเศษ',
      'เชี่ยวชาญ',
      'เชี่ยวชาญพิเศษ'
    ]
  };
  
  useEffect(() => {
    if (formData.district) {
      setSelectedDistrict(formData.district);
      setAvailableSchools(bangkokSchools[formData.district] || []);
    }
  }, [formData.district]);

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    
    // Update available schools based on selected district
    if (district) {
      setAvailableSchools(bangkokSchools[district] || []);
    } else {
      setAvailableSchools([]);
    }
    
    handleChange({
      target: {
        name: 'district',
        value: district
      }
    });

    handleChange({
      target: {
        name: 'school',
        value: ''
      }
    });

    handleChange({
      target: {
        name: phoneFieldName,
        value: ''
      }
    });
  };

  const handlePositionChange = (e) => {
    const position = e.target.value;
    
    // Update position
    handleChange({
      target: {
        name: 'position',
        value: position
      }
    });
    
    // Reset academic level when position changes
    requestAnimationFrame(() => {
      handleChange({
        target: {
          name: 'academicLevel',
          value: ''
        }
      });
    });
  };

  const handleSchoolChange = (e) => {
    const schoolName = e.target.value;

    
    // Find the selected school to auto-fill phone
    const school = availableSchools.find(s => s.name === schoolName);
    
    // Update school name
    handleChange({
      target: {
        name: 'school',
        value: schoolName
      }
    });
    
    // Auto-fill phone number
    if (school) {
      handleChange({
        target: {
          name: phoneFieldName,
          value: school.phone
        }
      });
    }
  };

  const availableAcademicLevels = formData.position ? (academicLevels[formData.position] || []) : [];

  return (
    <div className="border-t pt-4">
      <h4 className="font-semibold text-lg text-gray-800 mb-4">ข้อมูลการทำงาน</h4>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-gray-700 text-sm mb-2">
            ตำแหน่ง <span className="text-red-500">*</span>
          </label>
          <select
            name="position"
            value={formData.position || ''}
            onChange={handlePositionChange}  // Changed from handleChange to handlePositionChange
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          >
            <option value="">เลือกตำแหน่ง</option>
            <option value="ครู">ครู</option>
            <option value="ผู้บริหาร">ผู้บริหาร</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm mb-2">
            วิทยฐานะ
          </label>
          <select
            name="academicLevel"
            value={formData.academicLevel || ''}
            onChange={handleChange}
            disabled={!formData.position}  // Disabled until position is selected
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e] disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {formData.position ? 'เลือกวิทยฐานะ' : 'กรุณาเลือกตำแหน่งก่อน'}
            </option>
            {availableAcademicLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* District Dropdown - First */}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm mb-2">
          สังกัดสำนักงานเขต <span className="text-red-500">*</span>
        </label>
        <select
          name="district"
          value={formData.district || ''}
          onChange={handleDistrictChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
        >
          <option value="">เลือกเขต</option>
          {bangkokDistricts.map(district => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* School Dropdown - Appears after district is selected */}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm mb-2">
          โรงเรียน <span className="text-red-500">*</span>
        </label>
        <select
          name="school"
          value={formData.school || ''}
          onChange={handleSchoolChange}
          required
          disabled={!selectedDistrict}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e] disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">
            {selectedDistrict ? 'เลือกโรงเรียน' : 'กรุณาเลือกเขตก่อน'}
          </option>
          {availableSchools.map((school, index) => (
            <option key={index} value={school.name}>
              {school.name}
            </option>
          ))}
        </select>
      </div>

      {/* Phone - Auto-filled */}
      <div>
        <label className="block text-gray-700 text-sm mb-2">
          เบอร์โทรศัพท์{phoneFieldName === 'schoolPhone' ? 'โรงเรียน' : 'หน่วยงาน'}
        </label>
        <input
          type="tel"
          name={phoneFieldName}
          value={formData[phoneFieldName] || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e] bg-gray-50"
          placeholder="เบอร์จะถูกกรอกอัตโนมัติเมื่อเลือกโรงเรียน"
          readOnly
        />
        <p className="text-xs text-gray-500 mt-1">
          เบอร์โทรศัพท์จะถูกกรอกอัตโนมัติเมื่อเลือกโรงเรียน
        </p>
      </div>
    </div>
  );
};

// Scout Previous Training Fields
export const ScoutPreviousTrainingFields = ({ formData, handleChange }) => {
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    
    handleChange({
      target: {
        name: name,
        value: file,
        type: 'file'
      }
    });
  };

  return (
    <>
      {/* Previous Training Experience Section */}
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

            <div className="mb-3">
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

            {/* File Upload - Training Evidence (inside hasBasicTraining condition) */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-2">
                หลักฐานการฝึกอบรม (PDF หรือรูปภาพ)
              </label>
              <input
                type="file"
                name="trainingEvidence"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
              />
              {formData.trainingEvidence && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ ไฟล์: {formData.trainingEvidence.name}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                รองรับไฟล์: PDF, JPG, PNG (ขนาดไม่เกิน 5MB)
              </p>
            </div>
          </>
        )}
      </div>

      {/* Required Documents Section - OUTSIDE previous training */}
      <div className="border-t pt-4 mt-6">
        <h4 className="font-semibold text-lg text-gray-800 mb-4">เอกสารประกอบการสมัคร</h4>

        {/* File Upload - Supervisor Consent */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-2">
            คำยินยอมให้รับการฝึกอบรมจากผู้บังคับบัญชา <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="supervisorConsent"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          />
          {formData.supervisorConsent && (
            <p className="text-xs text-green-600 mt-1">
              ✓ ไฟล์: {formData.supervisorConsent.name}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            รองรับไฟล์: PDF, JPG, PNG (ขนาดไม่เกิน 5MB)
          </p>
        </div>

        {/* File Upload - Medical Certificate */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-2">
            ใบรับรองแพทย์ <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="medicalCertificate"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          />
          {formData.medicalCertificate && (
            <p className="text-xs text-green-600 mt-1">
              ✓ ไฟล์: {formData.medicalCertificate.name}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            รองรับไฟล์: PDF, JPG, PNG (ขนาดไม่เกิน 5MB)
          </p>
        </div>
      </div>
    </>
  );
};

// Red Cross Previous Training Fields
export const RedCrossPreviousTrainingFields = ({ formData, handleChange }) => {
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    
    handleChange({
      target: {
        name: name,
        value: file,
        type: 'file'
      }
    });
  };

  return (
    <>
      {/* Previous Training Experience Section */}
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

      {/* Required Documents Section */}
      <div className="border-t pt-4 mt-6">
        <h4 className="font-semibold text-lg text-gray-800 mb-4">เอกสารประกอบการสมัคร</h4>

        {/* File Upload - Supervisor Consent */}
        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-2">
            คำยินยอมให้รับการฝึกอบรมจากผู้บังคับบัญชา <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="supervisorConsent"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d6e5e]"
          />
          {formData.supervisorConsent && (
            <p className="text-xs text-green-600 mt-1">
              ✓ ไฟล์: {formData.supervisorConsent.name}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            รองรับไฟล์: PDF, JPG, PNG (ขนาดไม่เกิน 5MB)
          </p>
        </div>
      </div>
    </>
  );
};

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
        className="mt-1 mr-2 cursor-pointer"
      />
      <span className="text-gray-700">
        ข้าพเจ้าทราบระเบียบและจะปฏิบัติตามกฎของการฝึกอบรมทุกประการ และสามารถเข้ารับการฝึกอบรมได้ตลอดหลักสูตร <span className="text-red-500">*</span>
      </span>
    </label>
  </div>
);