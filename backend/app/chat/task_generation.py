from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv
load_dotenv()


openai = OpenAI()

task_prompt = PromptTemplate(
    input_variables=["prompt"],
    template="{prompt}. ONLY return a string array of 3-5 topics I should learn",
)

llm = LLMChain(
    llm=openai,
    prompt=task_prompt,
    verbose=True,
    output_key="tasks",
)
def generate_tasks(prompt):
    result = llm.invoke({
        "prompt": prompt
    })

    #print(result['tasks'])

    arr = []

    for task in result['tasks'].split('\n'):
        if task != '':
            if any(char.isdigit() for char in task):
                arr.append(task)

    return arr