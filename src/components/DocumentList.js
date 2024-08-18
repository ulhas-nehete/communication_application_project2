import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const getFilesFromLocalStorage = () => {
    const files = localStorage.getItem('uploads');
    return files ? JSON.parse(files) : [];
};

const DocumentList = () => {
    const [files, setFiles] = useState(getFilesFromLocalStorage);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentFile, setCurrentFile] = useState({ id: '', label: '', filename: '' });
    const [fileToDelete, setFileToDelete] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('uploads', JSON.stringify(files));
    }, [files]);

    // modal open button
    const handleOpenModal = (type, file = { id: '', label: '', filename: '' }) => {
        setModalType(type);
        setCurrentFile(file);
        setShowModal(true);
        setMessage('');
    };

    // modal close button
    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentFile({ id: '', label: '', filename: '' });
    };

    // modal save button
    const handleSaveFile = () => {

        // label validation 
        if (currentFile.label === '') {
            setMessage('Please enter file description');
            return;
        }

        // add filename validation
        if (modalType === 'add' && currentFile.filename === '') {
            setMessage('Please add file');
            return;
        }

        // edit filename validation
        if (modalType === 'edit' && currentFile.filename === '') {
            setMessage('Please add file');
            return;
        }

        if (modalType === 'add') {
            setFiles([...files, { ...currentFile, id: Date.now() }]);
        } else if (modalType === 'edit') {
            setFiles(files.map(file => (file.id === currentFile.id ? currentFile : file)));
        }
        handleCloseModal();
    };

    // modal delete button
    const handleDeleteFile = () => {
        setFiles(files.filter(file => file.id !== fileToDelete));
        setFileToDelete(null);
        setShowModal(false);
    };

    // file upload
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCurrentFile(prev => ({
                ...prev,
                filename: file.name
            }));
        }
    };

    return (
        <>
            <h1 className="pageHeader">My Uploads</h1>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th width="40%">Label</th>
                        <th className="text-center">File Name</th>
                        <th width="20%" className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {files.length > 0 ? (
                        files.map(file => (
                            <tr key={file.id}>
                                <td>{file.label}</td>
                                <td className="text-center">{file.filename}</td>
                                <td className="text-center">
                                    <Button variant="link" onClick={() => handleOpenModal('edit', file)}>Edit</Button>
                                    <span className="divider"> | </span>
                                    <Button variant="link" onClick={() => { setFileToDelete(file.id); handleOpenModal('delete'); }}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className='text-center'>No data found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'add' ? 'Upload' : modalType === 'edit' ? 'Edit' : 'Confirm File Deletion'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === 'delete' ? (
                        <div className="text-center">
                            <strong className="d-block p-3 mb-3">Are you sure?</strong>
                            <Button variant="default" className="me-2" onClick={handleDeleteFile}>Ok</Button>
                            <Button variant="default" onClick={handleCloseModal}>Cancel</Button>
                        </div>
                    ) : (
                        <Form>
                            <Form.Group controlId="formFileLabel" className="mb-3">
                                <Form.Label>File Description</Form.Label>
                                <Form.Control type="text" value={currentFile.label} onChange={(e) => setCurrentFile({ ...currentFile, label: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formFileUpload">
                                <Form.Label>File Upload</Form.Label>
                                {modalType === 'add' ? (
                                    <Form.Control type="file" onChange={handleFileChange} />
                                ) : (
                                    <Form.Control type="text" value={currentFile.filename} onChange={(e) => setCurrentFile({ ...currentFile, filename: e.target.value })} />
                                )}
                            </Form.Group>

                            <div className="mt-3">
                                <div className="mb-2">{message && <span className="error">{message}</span>}</div>
                                <Button variant="default" className="me-2" onClick={handleSaveFile}>
                                    {modalType === 'add' ? 'Upload Now' : 'Save'}
                                </Button>
                                <Button variant="default" onClick={handleCloseModal}>Cancel</Button>
                            </div>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>

            <Button variant="default" onClick={() => handleOpenModal('add')}>+ Add Upload</Button>
        </>
    );
};

export default DocumentList;
