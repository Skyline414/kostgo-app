import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F2',
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 22,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },

  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#075C4F',
    letterSpacing: 3,
  },

  logoSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 22,
    elevation: 4,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#075C4F',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 9,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 22,
    backgroundColor: '#FAFAFA',
  },

  passwordContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 28,
    backgroundColor: '#FAFAFA',
  },

  passwordInput: {
    flex: 1,
    fontSize: 14,
  },

  showPassword: {
    color: '#075C4F',
    fontWeight: '600',
    fontSize: 12,
  },

  loginButton: {
    backgroundColor: '#075C4F',
    height: 53,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 25,
  },
});