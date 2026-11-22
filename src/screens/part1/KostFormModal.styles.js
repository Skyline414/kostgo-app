import { StyleSheet } from 'react-native';
import { DARK, GREEN } from '../../core/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: DARK,
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F5F6F4',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 45,
    color: '#333',
    fontSize: 13,
  },
  inputMultiline: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  typeRow: {
    flexDirection: 'row',
  },
  typeButton: {
    backgroundColor: '#F5F6F4',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginRight: 8,
  },
  typeButtonActive: {
    backgroundColor: GREEN,
  },
  typeText: {
    color: GREEN,
    fontSize: 12,
  },
  typeTextActive: {
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E4F0EC',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelText: {
    color: GREEN,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
