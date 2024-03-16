from langchain_openai import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder
)
from langchain.schema import SystemMessage
from langchain.agents import OpenAIFunctionsAgent, AgentExecutor
from .tools.chroma_tool import get_tutorials_tool
import json

from dotenv import load_dotenv

load_dotenv()
# create an array of suggestions
chat = ChatOpenAI()

prompt = ChatPromptTemplate(
    messages=[
        SystemMessage(content="""
                        You are helping the human create a personal coding project.
                        Return at most 3 tutorials in JSON format ALWAYS. Not in regular text notation.
                        You must always format your answer to this prompt in JSON format."""),
        HumanMessagePromptTemplate.from_template("{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ]
)

tools = [
    get_tutorials_tool
]

agent = OpenAIFunctionsAgent(
    llm=chat,
    prompt=prompt,
    tools=tools,
)

def run_executor(prompt):

    #export this agent executor
    agent_executor = AgentExecutor.from_agent_and_tools(
        agent=agent, 
        tools=tools, 
        verbose=True
    )

    result = agent_executor.invoke(input=prompt)

    # Clean up the JSON string
    cleaned_json_string = result['output'].strip()

    # Parse the cleaned JSON string
    data = json.loads(cleaned_json_string)

    return data

# now you can use this as a dictionary
# print(data)

# or convert into json
# print(json.dumps(data, indent=4))
