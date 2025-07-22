import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [pan, setPan] = useState('');
  const [gst, setGst] = useState('');
  const [bank, setBank] = useState('');
  const [shopImages, setShopImages] = useState([]); // Placeholder for image URIs
  const [errors, setErrors] = useState({});

  const validateMobile = () => /^\d{10}$/.test(mobile);
  const validatePan = () => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  const validateGst = () => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
  const validateBank = () => bank.length > 5;

  const handleSendOtp = () => {
    if (!validateMobile()) {
      setErrors({ mobile: 'Enter valid 10-digit mobile number' });
      return;
    }
    setErrors({});
    // TODO: Integrate OTP send logic
    setOtpSent(true);
    Alert.alert('OTP sent', 'A one-time password has been sent to your mobile.');
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setErrors({ otp: 'Enter valid 6-digit OTP' });
      return;
    }
    setErrors({});
    // TODO: Integrate OTP verify logic
    Alert.alert('OTP verified', 'OTP verified successfully.');
  };

  const handleSubmit = () => {
    let newErrors = {};
    if (!validatePan()) newErrors.pan = 'Invalid PAN format';
    if (!validateGst()) newErrors.gst = 'Invalid GST format';
    if (!validateBank()) newErrors.bank = 'Enter valid bank details';
    if (shopImages.length === 0) newErrors.shopImages = 'Upload at least one shop image';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // TODO: Submit KYC details to backend
    Alert.alert('Submitted', 'KYC details submitted successfully.');
  };

  // Placeholder for image picker
  const handlePickImage = () => {
    // TODO: Integrate image picker
    setShopImages([...shopImages, 'placeholder-image-uri']);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Seller Sign-Up / KYC</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="number-pad"
        value={mobile}
        onChangeText={setMobile}
        maxLength={10}
      />
      {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}
      {!otpSent ? (
        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
          />
          {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
      {otpSent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="PAN Number"
            value={pan}
            onChangeText={setPan}
            autoCapitalize="characters"
            maxLength={10}
          />
          {errors.pan && <Text style={styles.error}>{errors.pan}</Text>}
          <TextInput
            style={styles.input}
            placeholder="GST Number"
            value={gst}
            onChangeText={setGst}
            autoCapitalize="characters"
            maxLength={15}
          />
          {errors.gst && <Text style={styles.error}>{errors.gst}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Bank Details (Account No, IFSC)"
            value={bank}
            onChangeText={setBank}
          />
          {errors.bank && <Text style={styles.error}>{errors.bank}</Text>}
          <View style={styles.imageSection}>
            <Text style={styles.label}>Shop Images</Text>
            <View style={styles.imageRow}>
              {shopImages.map((img, idx) => (
                <Image key={idx} source={{ uri: img }} style={styles.shopImage} />
              ))}
              <TouchableOpacity style={styles.addImage} onPress={handlePickImage}>
                <Text style={styles.addImageText}>+</Text>
              </TouchableOpacity>
            </View>
            {errors.shopImages && <Text style={styles.error}>{errors.shopImages}</Text>}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit KYC</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default Login

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  imageSection: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#eee',
  },
  addImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addImageText: {
    fontSize: 32,
    color: '#888',
  },
});