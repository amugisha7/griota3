import RNFS from 'react-native-fs';

const createCSV= (members)=> {
  const csvContent = 
    `"ID","NINofReferee1"\n${members.map((member) => {
        `"${member.id}",
        "${member.NINofReferee1}"`
    }).join("\n")}`;
  const path = RNFS.DocumentDirectoryPath + '/members.csv';

  RNFS.writeFile(path, csvContent, 'utf8')
    .then(() => {
      console.log('CSV file saved:', path);
      // Use RNFS.readFile(path, 'utf8') to read the file content if needed
    })
    .catch(error => {
      console.error('Error saving CSV file:', error);
    });
}

// Example usage
// const members = [
//   { name: 'John', age: 25 },
//   { name: 'Jane', age: 30 },
//   { name: 'Bob', age: 35 }
// ];

export default createCSV;
