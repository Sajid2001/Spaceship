from langchain.vectorstores.chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from dotenv import load_dotenv
load_dotenv()

embeddings = OpenAIEmbeddings()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1200,
    chunk_overlap=200,
    length_function=len
)

loader = TextLoader('tutorials.txt')
documents = loader.load_and_split(
    text_splitter=text_splitter
)

# for doc in documents:
#     print(doc.page_content)

#db = Chroma.from_documents(documents, embeddings, persist_directory="emb")

db = Chroma(persist_directory="emb", embedding_function=embeddings)

query = "What are the best tutorials for learning React?"
docs = db.similarity_search(query, k=3)
for doc in docs:
    print(doc.page_content)