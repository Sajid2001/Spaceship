from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv
load_dotenv()


openai = OpenAI()

recommendation_prompt = PromptTemplate(
    input_variables=["prompt"],
    template="You have a user who is {skill_level} and their interest is in {interest} development. Generate four project ideas for this person",
)

llm = LLMChain(
    llm=openai,
    prompt=recommendation_prompt,
    verbose=True,
    output_key="recommendations",
)
def generate_recommendations(skill_level, interest):
    result = llm.invoke({
        "skill_level": skill_level,
        "interest": interest
    })

    #print(result['tasks'])

    arr = []

    for rec in result["recommendations"].split('\n'):
        if rec != '':
            if any(char.isdigit() for char in rec):
                print(rec)
                arr.append(rec)

    return arr