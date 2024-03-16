from pydantic.v1 import BaseModel
from typing import List
from langchain.tools import Tool
from langchain.vectorstores.chroma import Chroma
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

def get_tutorials(prompt):
    db = Chroma(
    persist_directory="emb",
    embedding_function=embeddings
    )
    results = db.similarity_search(prompt, k=3)
    return results

#langchain will use this class to help chatgpt to better describe a tool
class GetTutorialsArgsSchema(BaseModel):
    prompt: str

get_tutorials_tool = Tool.from_function(
    name="get_tutorials",
    description="""
        Search the vector database for relevant tutorials and return the results as a JSON array. 
        The fields in the document represent a JSON Fields. 
        The fields are: name, description, url, instructor, img, price.
    """,
    func=get_tutorials,
    args_schema=GetTutorialsArgsSchema
)
