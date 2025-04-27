export const validateOTP = (otp) => {
  if (!otp) {
    return 'Mã OTP không được để trống.';
  }
  if (!/^\d{6}$/.test(otp)) {
    return 'Mã OTP phải là 6 chữ số.';
  }
  return null;
};

export const validateForm = (email, password) => {
  if (!email) return 'Email không được để trống.';
  if (!password) return 'Mật khẩu không được để trống.';
  if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.';
  return null;
};

export const validateFormRegister = (formData) => {
  const { fullName, email, phone, address, gender, job, file1, file2 } =
    formData;

  if (!fullName) return 'Họ và tên không được để trống.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return 'Email không hợp lệ.';
  if (!phone || !/^\d{10,11}$/.test(phone))
    return 'Số điện thoại không hợp lệ.';
  if (!address) return 'Địa chỉ không được để trống.';
  if (!gender) return 'Vui lòng chọn giới tính.';
  if (!job) return 'Vui lòng chọn nghề nghiệp.';
  if (!file1) return 'Vui lòng tải lên ảnh CMND/CCCD mặt trước.';
  if (!file2) return 'Vui lòng tải lên ảnh CMND/CCCD mặt sau.';

  return null;
};
