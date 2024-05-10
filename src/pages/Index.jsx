import { useState } from "react";
import { Container, VStack, Heading, Text, Input, Button, Link, useToast } from "@chakra-ui/react";
import { FaFileUpload, FaFileDownload } from "react-icons/fa";

const Index = () => {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to convert.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // This URL should be replaced with your actual API endpoint
      const response = await fetch("http://your-api-url/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setDownloadLink(data.downloadUrl);
        toast({
          title: "Conversion Successful",
          description: "Your Word document is ready for download.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: error.message || "Something went wrong during the conversion.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" padding={4}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">
          PDF to Word Converter
        </Heading>
        <Text>Convert your PDF documents into editable Word files.</Text>
        <Input type="file" accept=".pdf" onChange={handleFileChange} placeholder="Upload PDF file" size="lg" />
        <Button leftIcon={<FaFileUpload />} colorScheme="blue" onClick={handleUpload} isDisabled={!file}>
          Convert to Word
        </Button>
        {downloadLink && (
          <Link href={downloadLink} isExternal>
            <Button leftIcon={<FaFileDownload />} colorScheme="green">
              Download Word File
            </Button>
          </Link>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
