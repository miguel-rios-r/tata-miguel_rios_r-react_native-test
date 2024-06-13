import { Image, StyleSheet, TextInput, View, Pressable } from 'react-native';

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 100,
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  primaryButton: {
    backgroundColor: "#ffdc04",
    padding: 10, 
    alignItems: "center", 
    borderRadius: 5, 
    marginTop: 40
  },
  secondaryButton: {
    backgroundColor: "#DDD", 
    padding: 10, 
    alignItems: "center", 
    borderRadius: 5
  },
  divider: {
    backgroundColor: "#DDD",
    height: 1
  },
  card: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between"
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#555"
  },
  searchError: {
    fontSize: 10,
    fontStyle: "italic",
    textAlign: "right",
    color: "red",
    marginRight: 3
  },
  noResultsText: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: 40
  },
  clearButton: {
    margin: 2, 
    alignItems: "flex-end"
  },
  clearSearch: {
    backgroundColor: "#DDD", 
    paddingVertical: 2, 
    paddingHorizontal: 5, 
    borderRadius: 5
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  formItem: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#555",
  },
  disbledItem: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#F2F2F2",
    backgroundColor: "#F2F2F2"
  },
  error: {
    fontSize: 10,
    fontStyle: "italic",
    textAlign: "right",
    color: "red",
    marginRight: 3
  },
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    overflow: 'hidden',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  extraInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  }
});