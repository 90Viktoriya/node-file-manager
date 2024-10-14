# File Manager

- Use 22.x.x version (22.9.0 or upper) of Node.js
- The program is started by npm-script `start` in following way:
```bash
npm run start -- --username=your_username
```

## Notes:
If command with one argument and path to folder or file contains whitespace you should type it without any special symbols.

If command with two arguments and path to folder or file contains whitespace you should type it with double quotes.

### List of operation with example:

- Navigation & working directory (nwd)
  - Go upper from current directory:   
  ```bash
  up
  ```
  - Go to dedicated folder from current directory:
  ```bash
  cd my folder
  ```
  - Print in console list of all files and folders in current directory: 
  ```bash
  ls
  ```

- Basic operations with files
  - Read file and print it's content in console: 
  ```bash
  cat my file.txt
  ```
  - Create empty file in current working directory: 
  ```bash
  add my file.txt
  ```
  - Rename file: 
  ```bash
  rn "new file.txt" newName.txt
  ```
  - Copy file: 
  ```bash
  cp "New folder/fileName.txt" "other folder"
  ```
  - Move file: 
  ```bash
  mv "New folder/fileName.txt" "other folder"
  ```
  - Delete file: 
  ```bash
  rm my file.txt
  ```
- Operating system info (prints following information in console)
    - Print default system End-Of-Line to console:
    ```bash
    os --EOL
    ```
    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them): 
    ```bash
    os --cpus
    ```
    - Get home directory:  
    ```bash
    os --homedir
    ```
    - Get current *system user name*:  
    ```bash
    os --username
    ```
    - Get CPU architecture for which Node.js binary has compiled:  
    ```bash
    os --architecture
    ```
- Hash calculation  
  - Calculate hash for file:
  ```bash
  hash New folder/newName.txt
  ```
- Compress and decompress operations  
  - Compress file:
  ```bash
  compress "New folder/newName.txt" archive.bz
  ```
  - Decompress file: 
  ```bash
  decompress archive.bz "New folder/Decompressed.txt"
  ```  