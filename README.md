# The University of Adelaide - Software Engineering Project
## Project: *Attack Flow*
### Group: attackflow_01 
**Product Owner**: Ruvishka Rathnayake ruvishka.info@gmail.com

**Dev. Team**
- Se Jin Yoon (Jin) a1706219@adelaide.edu.au
- Ting-Wei Chin (Jordan) a1782423@adelaide.edu.au
- Jixing Ye (Ryan) a1798631@adelaide.edu.au
- Yu Zheng (Michael) a1739446@adelaide.edu.au
- Faisal Fahad Ibrahim Hawsawi a1822781@adelaide.edu.au
- Joseph Toubia a1753547@adelaide.edu.au
- Zemin Wong a1780385@adelaide.edu.au
- Lina Nehme a1802697@adelaide.edu.au
- Ran Qi a1675122@adelaide.edu.au

---

## Setup Instructions
**1. Environment Setup**
1. Ensure you have Node.js installed on your machine. You can check your current Node.js version by running:
```
node -v
```
2. Set up your database. If using a relational database like MySQL, you may need to import the provided SQL file (attackflow.sql).
**2. Install Dependencies**
1. Navigate to the project's root directory:
```
cd path_to_directory/attackflow_01
```
2. Install the main project dependencies:
```
npm install
```
3. Navigate to the backend directory and install the backend dependencies:
```
cd attackflow_backend
npm install
```
4. Navigate to the frontend directory and install the frontend dependencies:
```
cd ../attackflow_frontend
npm install
```
**3. Database Setup and Configuration**
Setting up and configuring the database is crucial for the application's proper functioning. Follow these steps to ensure a smooth database setup:

***Prerequisites***
Ensure you have a relational database system, such as MySQL or PostgreSQL. If not, download and install from their official websites:
MySQL
PostgreSQL

***Database Setup Steps***
1. Start the Database Service

For MySQL:
```
sudo service mysql start
```

For PostgreSQL:
```
sudo service postgresql start
```

2. Create a New Database

For MySQL, open the MySQL shell and execute:
```
CREATE DATABASE attackflowdb;
```

For PostgreSQL, open the psql shell and execute:
```
CREATE DATABASE attackflowdb;
```

3. Import the SQL File

Navigate to the project directory containing the attackflow.sql file:
```
cd path_to_directory/attackflow_01
```

For MySQL:
```
mysql -u your_username -p attackflowdb < attackflow.sql
```

For PostgreSQL:
```
psql -U your_username -d attackflowdb -a -f attackflow.sql
```

Replace your_username with your actual database username.

4. Update Backend Environment Variables

Navigate to the attackflow_backend directory and open the .env file:
```
cd attackflow_backend
nano .env
```

Ensure you update database configurations such as DB_HOST, DB_USER, DB_PASS to match your setup.

5. Test Database Connection

While in the attackflow_backend directory, start the backend service:
```
npm start
```

Ensure there are no errors related to database connectivity.
**4. Start the Services**
1. To start the backend service, navigate to the backend directory and run:
```
cd path_to_directory/attackflow_01/attackflow_backend
npm start
```
2. To start the frontend service in development mode, navigate to the frontend directory in a new terminal window and run:
```
cd path_to_directory/attackflow_01/attackflow_frontend
npm run dev
```
Your application should now be running. Access the frontend by navigating to the specified address in your web browser (typically http://localhost:3000 for Vite projects).
---

## Usage Instructions

### 1. Uploading Incident Report Documents
- Navigate to the 'Upload' section on the frontend.
- There's a drag-and-drop area for file uploads. Users can either drag files or select files from their computer to upload.
- After selecting the desired files, click on the "Submit" button to upload and save the document details.

### 2. Annotation
- After uploading, navigate to the 'Annotation' section.
- View the uploaded incident report text.
- Highlight the desired sections of the text for annotation.
- Click on the "Edit annotation" button to open a dialog.
- In the dialog, provide the "referenced text" and select appropriate tags/labels from the dropdown.
- Click on the "Save" button to save your annotations.

### 3. Attack Flow Visualization
- Navigate to the 'Visualization' section.
- Select the desired document or attack flow.
- Interact with the visualized attack flow to understand the sequence and details.

### 4. Version Control
- Each document has a version history.
- Navigate to the 'Document History' section to view changes made by different users.

---

## Functionality Overview
- **Uploading**: Users can upload incident report documents. Once uploaded, the document details are saved, and the document is ready for annotation.
- **Annotation**: Users can highlight sections of the uploaded document and annotate them with tags and labels. A dialog facilitates the annotation process.
- **Tags**: A hierarchical structure of tags or labels is available for users to categorize their annotations.
- **Attack Flow Visualization**: Users can visually interact with and study the sequence and details of attack flows.

---

## Validation and Contribution
- The system's functionalities can be validated by creating attack flow files and seeking client approval.
- Contributions can be made to the project by following the contribution guidelines provided.